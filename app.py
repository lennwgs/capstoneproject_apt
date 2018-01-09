from flask import Flask, render_template, request, redirect
import numpy as np
import datetime
from bokeh.plotting import figure
from bokeh.embed import components
import urllib.request
#import urllib2
import simplejson as json
import pandas as pd

app = Flask(__name__)

app.vars = {}

@app.route('/',methods=['GET','POST'])
def index():
    return render_template('index.html')

#used to filter out year
def compare_year(date_input):
    year = [year_date[:4] for year_date in date_input]
    return pd.Series(year)

@app.route('/plot',methods=['GET','POST'])
def plot():
    #get all the values from the previous index.html
    app.vars['ticker'] = request.form['ticker']
    app.vars['features']  = request.form.getlist('features')

    #ensuring that it is not anything else
    tickername = app.vars['ticker'].upper()
    features = app.vars['features']
    year = '2017'

    #reading all the data
    url2 = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?api_key=TyZPdNdmtsuH81Akw4Ck'
    data = urllib.request.urlopen(url2).read()#request.get(url2)
    #data = urllib2.urlopen(url2).read()
    parsed_data = json.loads(data)

    col_names = [colname['name'] for colname in parsed_data['datatable']['columns']]
    df1 = pd.DataFrame(parsed_data['datatable']['data'])
    df1.columns = col_names

    #filtering only the ticker mention and the year
    new_data = df1[(df1['ticker'] == tickername) & (compare_year(df1['date'])==year)]

    #initializing plots
    p1 = figure(x_axis_type="datetime", title="Quandl WIKI EOD Stock Prices - 2017")
    p1.grid.grid_line_alpha=0.3
    p1.xaxis.axis_label = 'Date'
    p1.yaxis.axis_label = 'Price'

    #plot line
    if 'close' in features:
        legend_name1 = tickername + ": close"
        p1.line(pd.to_datetime(new_data['date']), new_data['close'], color='#A6CEE3', legend=legend_name1)

    if 'adj_close' in features:
        legend_name2 = tickername + ": adj_close"
        p1.line(pd.to_datetime(new_data['date']), new_data['adj_close'], color='#B2DF8A', legend=legend_name2)

    if  'open' in features:
        legend_name3 = tickername + ": open"
        p1.line(pd.to_datetime(new_data['date']), new_data['open'], color='#33A02C', legend=legend_name3)

    if 'adj_open' in features:
        legend_name4 = tickername + ": adj_open"
        p1.line(pd.to_datetime(new_data['date']), new_data['adj_open'], color='#FB9A99', legend=legend_name4)

    p1.legend.location = "top_right"

    script, div = components(p1)

    return render_template('plot.html', script = script, div= div, ticker = tickername, features = features)

if __name__ == '__main__':
  app.run()#debug=True)#port=33507)
