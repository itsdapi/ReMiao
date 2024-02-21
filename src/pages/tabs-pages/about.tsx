import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    console.log("About show");
  }, []);
  return <div>About Page</div>;
}
