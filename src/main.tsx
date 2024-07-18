import {
  CartLineUpdatePayload,
  CartUpdatePayload,
  CartViewPayload,
  CollectionViewPayload,
  PageViewPayload,
  ProductViewPayload,
  SearchViewPayload,
  useAnalytics,
} from "@shopify/hydrogen";
import { useEffect } from "react";

declare global {
  interface Window {
    _cv_track: (
      ev:
        | "pageView"
        | "viewContent"
        | "viewCategory"
        | "viewCart"
        | "cartUpdate"
        | "addToCart"
        | "searchViewed",
      data:
        | PageViewPayload
        | ProductViewPayload
        | CollectionViewPayload
        | CartViewPayload
        | CartUpdatePayload
        | CartLineUpdatePayload
        | SearchViewPayload
    ) => void;
  }
}

const ConvboxTrack = () => {
  const { subscribe, register } = useAnalytics();
  const { ready } = register("convbox tracking");

  useEffect(() => {
    // Standard events
    subscribe("page_viewed", (data) => {
      window._cv_track?.("pageView", data);
    });
    subscribe("product_viewed", (data) => {
      window._cv_track?.("viewContent", data);
    });
    subscribe("collection_viewed", (data) => {
      window._cv_track?.("viewCategory", data);
    });
    subscribe("cart_viewed", (data) => {
      window._cv_track?.("viewCart", data);
    });
    subscribe("cart_updated", (data) => {
      window._cv_track?.("cartUpdate", data);
    });
    subscribe("product_added_to_cart", (data) => {
      window._cv_track?.("addToCart", data);
    });
    subscribe("search_viewed", (data) => {
      window._cv_track?.("searchViewed", data);
    });
    ready();
  }, []);

  return null;
};

export default ConvboxTrack;
