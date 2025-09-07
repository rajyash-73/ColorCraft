import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "paypal-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface PayPalButtonProps {
  country: string;
  userInfo: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
  onSuccess: (subscriptionId: string) => void;
  onError: (error: any) => void;
  onCancel: () => void;
}

export default function PayPalButton({
  country,
  userInfo,
  onSuccess,
  onError,
  onCancel,
}: PayPalButtonProps) {
  const createSubscription = async () => {
    const subscriptionPayload = {
      country: country,
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    };
    
    const response = await fetch("/api/subscription/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptionPayload),
    });
    
    const data = await response.json();
    return { subscriptionId: data.id };
  };

  const onApprove = async (data: any) => {
    console.log("Subscription approved:", data);
    if (data.subscriptionID) {
      onSuccess(data.subscriptionID);
    }
  };

  const onErrorHandler = async (data: any) => {
    console.log("PayPal error:", data);
    onError(data);
  };

  const onCancelHandler = async (data: any) => {
    console.log("PayPal cancelled:", data);
    onCancel();
  };

  useEffect(() => {
    const loadPayPalSDK = async () => {
      try {
        if (!(window as any).paypal) {
          const script = document.createElement("script");
          script.src = import.meta.env.PROD
            ? "https://www.paypal.com/web-sdk/v6/core"
            : "https://www.sandbox.paypal.com/web-sdk/v6/core";
          script.async = true;
          script.onload = () => initPayPal();
          document.body.appendChild(script);
        } else {
          await initPayPal();
        }
      } catch (e) {
        console.error("Failed to load PayPal SDK", e);
      }
    };

    loadPayPalSDK();
  }, []);

  const initPayPal = async () => {
    try {
      const clientToken: string = await fetch("/api/paypal/setup")
        .then((res) => res.json())
        .then((data) => {
          return data.clientToken;
        });

      const sdkInstance = await (window as any).paypal.createInstance({
        clientToken,
        components: ["paypal-payments"],
      });

      const paypalCheckout = sdkInstance.createPayPalOneTimePaymentSession({
        onApprove,
        onCancel: onCancelHandler,
        onError: onErrorHandler,
      });

      const onClick = async () => {
        try {
          const subscriptionPromise = createSubscription();
          await paypalCheckout.start(
            { paymentFlow: "subscription" },
            subscriptionPromise,
          );
        } catch (e) {
          console.error(e);
          onError(e);
        }
      };

      const paypalButton = document.getElementById("paypal-subscription-button");

      if (paypalButton) {
        paypalButton.addEventListener("click", onClick);
      }

      return () => {
        if (paypalButton) {
          paypalButton.removeEventListener("click", onClick);
        }
      };
    } catch (e) {
      console.error(e);
      onError(e);
    }
  };

  return (
    <div>
      <paypal-button 
        id="paypal-subscription-button"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
      >
        Subscribe with PayPal
      </paypal-button>
    </div>
  );
}