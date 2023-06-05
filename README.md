# Credit Card Validation System

This app takes credit card information, then sends it to a backend API for validation. The backend should respond with either success or failure.

The validation algorithm uses the following rules:

1. The expiry date of the credit card (year and month) must be AFTER present time.
2. The CVV (security code) of the credit card must be exactly 3 digits long
   - Unless it’s an American Express card, in which case the CVV must be exactly 4 digits long.
   - American Express are cards whose PAN (card numbers) starts with either “34” or “37”.
3. The PAN (card number) is between 16 and 19 digits long.
4. Last digit of the PAN (card number) is checked using Luhn’s algorithm.

I changed the rule #3 to _"The PAN (card number) is between **15** and 19 digits long."_

Why? Because AMEX credit card numbers are 15 digits long.

## Usage

By default, the app runs with docker-compose.

```
docker-compose up
```

If you want to run the application separately, you have to run the following commands:

In the backend folder:

```
npm install
npm run watch
```

In the frontend folder:

```
npm install
npm run dev
```

Then go to http://localhost:7000/

## Test

You can run tests in the Backend by running the following command:

```
npm run test
```

Also, there is a Postman collection with requests to test the Backend API. The file is in backend/postman/ folder.
