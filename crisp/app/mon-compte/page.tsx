"use client";
 
import Link from "next/link";
import { getSession } from "@/utils/sessions";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { useState } from "react";
import { FormEvent } from "react";
 
export default function Home() {
  const logSession = async () => {
    const session = await getSession();
    console.log(session);
  };
 
  useEffect(() => {
    logSession();
  }, []);

  const userLogout = () => {
    // Reset de la session Crisp
    Crisp.session.reset();
    // Suppression du token Crisp pour arrêter le bot
    Crisp.setTokenId();
    // ... Ajouter votre propre logique ici
  };
 
  const userLogin = async () => {
    // ... Ajouter votre propre logique ici (récupératio du token de l'utilisateur connecté par exemple)
    // const session = await getSession();
    // Configuration de Crisp (obligatoire pour utiliser le bot sur votre site)
    Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
      autoload: false, // Si vous voulez afficher le bot immédiatement, passez à 'true' ici
    });
    Crisp.session.reset();
    // Récupération de l'historique d'une conversation Crisp
    Crisp.setTokenId();
    // Affichage du bot (utile uniquement si 'autoload: false' dans la configuration)
    Crisp.load();

    // Ouverture du bot
    Crisp.chat.open();
    Crisp.chat.close();

  }
  
  

  

  //UseEffect est là pour se déclencher suite à une action (mise à jour d'une variable, le chargement de la page)
  useEffect(() => {
    userLogin();

    
  }, [])

  const showCarousel = () => {
    const list = [
      {
        title: "Le Baiser",
        description: "Aller a l'oeuvre 1, Le Baiser ",
        actions: [
          {
            label: "Page 1",
            url: "/page1/oeuvre1",
          },
        ],
      },
      {
        title: "La Joconde",
        description: "Aller a l'oeuvre 2, La Joconde",
        actions: [
          {
            label: "Page 2",
            url: "/page1/oeuvre2",
          },
        ],
      },
      {
        title: "La Cène",
        description: "Aller a l'oeuvre 3, La Cène",
        actions: [
          {
            label: "Page 3",
            url: "/page1/oeuvre3",
          },
        ],
      }
    ]


       // Affichage d'un carousel dans le bot
Crisp.message.show("carousel", {
text: "Voici la liste des oeuvres :",
targets: list,
});
};

// export default function RegisterForm() {
//   const [error, setError] = useState(<></>);


// const handleProposition = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault(); // Prevent default form submission

//   // Get data from form
//   const mail = e.currentTarget.firstname.value.trim();
//   const id = e.currentTarget.firstname.value.trim();
//   const response = e.currentTarget.firstname.value.trim();
  
//   // If any data is empty
//   if (
//     mail == "" ||
//     id == "" ||
//     response == "" 
    
//   ) {
//     setError(<p>All fields are required</p>);
//   } else {
//     try {

//       const respons = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           response,
          
//         }),
//       });
//       // If there is an error (user already exists for exemple)
//       if (!response.ok || response.status >= 300) {
//         const { message } = await response.json();
//         setError(<p>{message}</p>);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(<p>An error occured</p>);
//     }
//   }
// };

  const propose = () => {
  
    Crisp.message.show("field", {
      id: "identifiant_de_votre_choix",
      text: "Proposition des Oeuvres.",
      explain: "Je propose la Joconde, Le cri...",
    });
}
const saveProposition = async (proposition: string) => {  

    const session = await getSession();

    const reponse = await fetch("/api/proposition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: session.rowid,
        proposi: proposition
      }),
    });

    if(!reponse.ok || reponse.status >= 300){
      const { message } = await reponse.json();
      Crisp.message.show("text", message);
    }
    else{
      Crisp.message.show("text", "Merci d'avoir proposé une œuvre !");
    }
  
  // sauvegarde en bdd de la proposition
  
  
}
  Crisp.message.onMessageReceived(
    (data: { content: { id: string; value: any } }) => {
      if (data.content.id == "identifiant_de_votre_choix") {
        const proposition = data.content.value;
        if (proposition) { // Si ce n'est pas vide
          saveProposition(proposition);
          Crisp.message.offMessageReceived();
          return;
        }
        return;
      }
    }
  );

  return (
    
    <>
      <h1>MON COMPTE</h1>
      <Link href="/mon-compte/profil">Mon profil</Link>
      <button onClick={showCarousel}> Afficher le carousel</button>
      <button onClick={propose}> Proposer des oeuvres</button>
      
    </>
  );
}


