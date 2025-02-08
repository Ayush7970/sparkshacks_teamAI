import React, { useState } from "react";
import TeamPhoto from "../Images/teamPic.png"; 
import vLI from "../Images/VLICopy.png"         //V's Image
import ayushLI from "../Images/ayushLICopy.png" //Ayush's image
import maazLI from "../Images/maazLICopy.png" //Maaz's Image
import anuLI from "../Images/AnuLI.png"     //Anupam's Image
import hanelLI from "../Images/hanelLI.png" //Hanel's image
import "../Styles/Hanel.css";
import "../Styles/TeamMember.css";

const MeetTheTeam = () => {
  return (
    <div className="team-container">
      <img src={TeamPhoto} alt="Our Team" className="team-photo" />
      <div className="team-caption">The Members</div> {/* First we start off by showcasing the whole team*/}

      <div className="profile-container">
            <div className="image-container">
                <img src= {vLI} alt="Vansh Mattraa" className="profile-image" />
                {/*<div className="name">Vansh Mattraa</div> {/* The name of the member*/}
            </div>
            <div className="info">
                <div className="name">Vansh Mattraa</div> {/* The name of the member*/}
                <div className="role">Role: <span> Full-Stack Chatbot & Farm-Ranking Development </span></div> {/* Reveal their role*/}
                <div className="description">Description: <span>A last-minute pickup for the team, Vansh, who goes by V, proved to be as timely as they come, as he would contribute heavily to the design of our chatbot and its functionality. With good conversations and laughs while debugging, you won't find a personality like V anywhere else.</span></div> {/* Then we showcase Vansh's, or V for short, contributions */}
            </div>
        </div>

        <div className="profile-container">
            <div className="image-container">
                <img src= {ayushLI} alt="Ayush" className="profile-image" />
                {/*<div className="name">Ayush Bhardwaj</div> */}
            </div>
            <div className="info">
                <div className="name">Ayush Bhardwaj</div> 
                <div className="role">Role:  <span>  LLM Training & Backend Development</span></div>
                <div className="description">Description: <span> Ayush spent long hours sacrificing his laptop to run and train the LLM while also motivating his fellow team members and keeping them on track. Ayush has proven to be heaviliy dedicated toward his work and projects and is the embodiment of dedication. He and Anupam were a sleepless duo to be reckoned with.</span></div> {/* Next we display Ayush's achievements*/}
            </div>
        </div>

        <div className="profile-container">
            <div className="image-container">
                <img src= {maazLI} alt="Maaz" className="profile-image" />
                
            </div>
            <div className="info">
                <div className="name">Maaz Iqbal</div> 
                <div className="role">Role: <span> GitHub Repository Management and Front-End Development </span></div>
                <div className="description">Description: <span> When trouble unexpectedly rose while trying to make our GitHub repository, Maaz rose to the challenge and was able to find the miniscule issues that were preventing us from making a repo. He's also one of the easiest guys to have a conversation with. He collaborated with Hanel for website design.</span></div> {/* Afterwards, we want to give credit to Maaz from his contributions in-person and over call*/}
            </div>
        </div>

        <div className="profile-container">
            <div className="image-container">
                <img src= {anuLI} alt="Maaz" className="profile-image" />
                
            </div>
            <div className="info">
                <div className="name"> Anupam Sai Sistla</div> 
                <div className="role">Role: <span> Codebase Management & Integration </span></div>
                <div className="description">Description: <span>Sleep is for the weak when talking about Anupam Sistla. As soon as the Hackathon started, he contributed to multiple facets of our project, and was tasked with integrating various sources into one complete file. All while running on 45 minutes of sleep.</span></div> {/* We also credit Anupam for both his front-end and back-end solutions*/}
            </div>
        </div>

        <div className="profile-container">
            <div className="image-container">
                <img src= {hanelLI} alt="Maaz" className="profile-image" />
               
            </div>
            <div className="info">
                <div className="name"> Hanel Vujic</div> 
                <div className="role">Role: <span> Front-End Development of Website </span></div>
                <div className="description">Description: <span> Not planning on joining SparkHacks until brought up by his friend Anupam, Hanel embarked on long nights on learning React whilst never having touched HTML, CSS, and JS in his life. Always looking to be supportive, you could call him the team cheerleader.</span></div> {/* And finally, we give kudos to Hanel for continuing the front-end development of the website*/}
            </div>
        </div>

        {/* NOTE: Had to copy/paste each profile-container as there was some trouble making a TeamMember object throughout the development of this project*/}

      </div>

  );
};


export default MeetTheTeam;