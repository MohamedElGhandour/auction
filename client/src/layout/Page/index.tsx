import { useEffect } from "react";

const Page = (props: any) => {
  useEffect(() => {
    document.title = "Auction | " + props.title || "Auction";
  }, [props.title]);
  return props.children;
};

export default Page;
