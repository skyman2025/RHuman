import Applicants from "./Applicants";
import { useState,useEffect } from "react";
import { getApplicants } from "../apiController/applicantsApi";

export default function ListCantidate({ selectedProfession }) {
  const [applicants,setApplicants] = useState([]);

  useEffect(() => {
    getApplicants().then(res => {
      setApplicants(res.aspirantes);
    })
  },[]);

  const filteredApplicant = selectedProfession === 'Todos'
    ? applicants
    : applicants.filter(aspirante => aspirante.profession === selectedProfession);

  return (
    <Applicants aspirantes={filteredApplicant} />
  )
}