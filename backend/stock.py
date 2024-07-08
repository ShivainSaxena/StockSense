import pandas as pd
import yfinance as yf
from prophet import Prophet
from datetime import datetime, timedelta
import sys

symbol = sys.argv[1]

# Fetch the data
apl = yf.Ticker(symbol)
df = apl.history(period="5d")

# Select date and price
df = df[['Close']]
df = df.reset_index()

# Rename the features
df = df.rename(columns={'Date': 'ds', 'Close': 'y'})
df['ds'] = pd.to_datetime(df['ds']).dt.tz_localize(None)

# Create and fit the Prophet model
fbp = Prophet(daily_seasonality=True)
fbp.fit(df)

# Make a future dataframe
future = fbp.make_future_dataframe(periods=365)

# Predict the future
forecast = fbp.predict(future)

today = datetime.now()

# Calculate tomorrow's date
tomorrow = today + timedelta(days=1)

# Format the date
formatted_date = tomorrow.strftime('%Y-%m-%d')

predict = forecast[forecast.ds == formatted_date]['yhat'].iloc[0]

print(predict)

