import {
  Client,
  Environment,
  LogLevel,
  OAuthAuthorizationController,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import { Request, Response } from "express";

/* PayPal Controllers Setup */

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

if (!PAYPAL_CLIENT_ID) {
  throw new Error("Missing PAYPAL_CLIENT_ID");
}
if (!PAYPAL_CLIENT_SECRET) {
  throw new Error("Missing PAYPAL_CLIENT_SECRET");
}

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: {
      logBody: true,
    },
    logResponse: {
      logHeaders: true,
    },
  },
});

const ordersController = new OrdersController(client);
const oAuthAuthorizationController = new OAuthAuthorizationController(client);

/* Token generation helpers */

export async function getClientToken() {
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");

  const { result } = await oAuthAuthorizationController.requestToken(
    {
      authorization: `Basic ${auth}`,
    },
    { intent: "sdk_init", response_type: "client_token" },
  );

  return result.accessToken;
}

/* Subscription Plans */
export const SUBSCRIPTION_PLANS = {
  USD: {
    planId: "P-5ML4271244454362WXNWU5NQ", // PayPal plan ID for $1 USD
    price: "1.00",
    currency: "USD"
  },
  INR: {
    planId: "P-1GF589577P007863KXNWU5NQ", // PayPal plan ID for ₹100 INR
    price: "100.00", 
    currency: "INR"
  }
};

/* Subscription management using Orders API for recurring payments */

export async function createSubscription(req: Request, res: Response) {
  try {
    const { country = "US" } = req.body;
    const plan = country === "IN" ? SUBSCRIPTION_PLANS.INR : SUBSCRIPTION_PLANS.USD;

    const orderRequest = {
      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: plan.currency,
              value: plan.price
            },
            description: `Coolors.in Premium Subscription - Monthly (${plan.currency})`
          }
        ],
        application_context: {
          brand_name: "Coolors.in",
          locale: "en-US",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          return_url: `${req.protocol}://${req.get('host')}/subscription/success`,
          cancel_url: `${req.protocol}://${req.get('host')}/subscription/cancel`
        }
      },
      prefer: "return=representation"
    };

    const { body, ...httpResponse } = await ordersController.createOrder(orderRequest);
    const jsonResponse = JSON.parse(String(body));
    const httpStatusCode = httpResponse.statusCode;

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create subscription order:", error);
    res.status(500).json({ error: "Failed to create subscription order." });
  }
}

export async function captureSubscription(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    const captureRequest = {
      id: orderId,
      prefer: "return=representation"
    };

    const { body, ...httpResponse } = await ordersController.captureOrder(captureRequest);
    const jsonResponse = JSON.parse(String(body));
    const httpStatusCode = httpResponse.statusCode;

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to capture subscription order:", error);
    res.status(500).json({ error: "Failed to capture subscription order." });
  }
}

export async function loadPaypalDefault(req: Request, res: Response) {
  const clientToken = await getClientToken();
  res.json({
    clientToken,
  });
}