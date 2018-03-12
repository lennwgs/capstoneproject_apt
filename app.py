from flask import Flask, render_template, request, redirect
import numpy as np
import datetime
import simplejson as json
import pandas as pd

app = Flask(__name__)

app.vars = {}

@app.route('/home',methods=['GET','POST'])
def home():
    return render_template('html/Home.html')


@app.route('/apartmentFinder',methods=['GET','POST'])
def aptFinder():
    return render_template('html/apartmentFinder.html')

@app.route('/apartmentRecommender',methods=['GET','POST'])
def aptRecommender():
    posts_ = False
    if request.method == 'GET':
        posts_ = False
        return render_template('html/apartmentRecommender.html', posted = posts_)
    elif request.method == 'POST':
        import numpy as np
        from sklearn.decomposition import PCA
        from sklearn.preprocessing import StandardScaler
        from scipy import spatial

        #scaling data
        data_scaler = StandardScaler()
        full_aptDF = pd.read_csv("./static/other/unique_aptDF.csv", index_col=None)
        filtered_aptDF_scaled = full_aptDF
        filtered_aptDF_scaled = pd.DataFrame(filtered_aptDF_scaled,columns = ["Rent","distanceToPurdue","crimeRate"])
        filtered_aptDF_scaled = pd.DataFrame(data_scaler.fit_transform(filtered_aptDF_scaled),columns = ["Rent","distanceToPurdue","crimeRate"])

        #pca
        apt_pca = PCA(n_components=2)
        apt_reduced = apt_pca.fit_transform(filtered_aptDF_scaled)

        #get data from users

        app.vars['most'] = request.form['most_important']
        app.vars['med'] = request.form['med_important']
        app.vars['least'] = request.form['least_important']
        app.vars['values'] = request.form.getlist('impt_val')

        users_data = {app.vars['most']:float(app.vars['values'][0]),
                        app.vars['med']: float(app.vars['values'][1]),
                        app.vars['least']: float(app.vars['values'][2])}
        user_input = np.array([users_data['rent'],users_data['dist'],users_data['safety']]).reshape(1, -1)
        pt = apt_pca.transform(data_scaler.transform(user_input))
        top_5_apts = spatial.KDTree(apt_reduced).query(pt,k=5)[1][0]
        top_5_apts_name = full_aptDF.iloc[top_5_apts,:]
        top_5_apts_name = top_5_apts_name.reset_index()
        result = top_5_apts_name.to_json()

        f = open('output_test_recommend.txt','w')
        f.write('most: %s\n'%(app.vars['most']))
        f.write('med: %s\n\n'%(app.vars['med']))
        f.write('least: %s\n'%(app.vars['least']))
        f.write('values: %s\n\n'%("\n".join(app.vars['values'])))
        f.write('apt names: %s\n\n'%("\n".join(top_5_apts_name.AptName)))
        f.close()
        posts_ = True
        return render_template('html/apartmentRecommender.html', result = result, posted = posts_)



if __name__ == '__main__':
    app.run(debug=True)
