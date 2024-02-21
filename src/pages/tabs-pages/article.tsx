import { useEffect } from "react";

export default function Article() {
  useEffect(() => {
    console.log("Article show");
  }, []);
  return <div>Article Page</div>;
}
