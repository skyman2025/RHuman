import Applicants from "./Applicants";
import { useState,useEffect } from "react";
import { getApplicants } from "../apiController/applicantsApi";

export default function ListCantidate() {
  const [applicants,setApplicants] = useState([]);

  useEffect(() => {
    console.log("Se monto el componente");
    getApplicants().then(res => {
      setApplicants(res.aspirantes);
    })
  },[]);

  function getRandomProducts(products, count) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  const randomProducts = getRandomProducts(applicants, 4);

  return (
    <Applicants aspirantes={randomProducts} />
  )
}