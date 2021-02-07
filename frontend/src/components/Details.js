import React from "react";

function Details(props) {
  
return (
    <div class="todoapp stack-large">
    <form class="details_box">
      <ul>
          <li>
              Due:
          </li>
          <li>
            Assigned By:
          </li>
          <br/>
          
          <li id="description" contenteditable="true">
      
            Description: Due to growing frustrations surrounding the inability for D2L to optimize group project work in our current online environment, a need has arisen for a new system or application that streamlines the process of group participation and communication while still allowing faculty the chance to oversee curriculum completion. The intention of this project is to build in functionalities like a peer to peer chat, calendar updates, and third party zoom connection in an attempt to ease the burden of group project work in a way that is convenient for both students and professors. From a solely faculty perspective, the goal is to be able to effectively orient students and materials into designated groups and be able to quickly disperse information and tools as well as evaluate group progress and grade said progress. 
Both student and faculty dashboards will share the ability to personalize profiles and access information that is deemed necessary for that particular individual. We also intend to implement a social feedback functionality where both students and faculty may provide personalized critiques on one’s performance in an organized feed within a person’s profile. In this way, we develop a personalized experience that allows both parties the knowledge of how to improve for future projects.

          </li>
          
      </ul>
    </form>
    </div>
  );

}
export default Details;