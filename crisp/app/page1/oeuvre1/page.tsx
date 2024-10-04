"use client"

import Oeuvre1 from "@/components/Oeuvre1";
import { getSession } from "@/utils/sessions";
import { useEffect } from "react";

export default function oeuvre1() {
  const logSession = async () => {
    const session = await getSession();
    console.log(session);
  }

  const saveVisite = async () => {

    const session = await getSession();

    fetch("/api/visite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: session.rowid,
        oeuvre: 'oeuvre 1'
      }),
    });
  }
  
  
  

  //UseEffect est là pour se déclencher suite à une action (mise à jour d'une variable, le chargement de la page)
  useEffect(() => {
    saveVisite()
  }, [])
  
  
  return(<Oeuvre1></Oeuvre1>)

}
