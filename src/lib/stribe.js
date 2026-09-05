import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  "seeker_pro": "price_1UC54J4HcZMJWS5ftwDG9kkv",
  "seeker_premium": "price_1UCGQG4HcZMJWS5fF16gPTU9",
  "recruiter_growth": "price_1UCGRI4HcZMJWS5fsv4vKDcT",
  "recruiter_enterprise": "price_1UCGS94HcZMJWS5fLPJc4K1k",
};
