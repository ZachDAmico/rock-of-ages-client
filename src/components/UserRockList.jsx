// ended up following video for method 1
// i think this method could work and invoke this fetch for the /mine path, but unsure of the details
// import { useState } from "react"

// export const UserRockList = () => {
//     const [userRockState, setUserRockState] = useState([]);

//     const fetchUserRocks = async () => {
//         const response = await fetch(" http://localhost:8000/rocks?owner=current",{
//             headers: {
//                 Authorization: `Token ${
//                     JSON.parse(localStorage.getItem("rock_token")).token
//                 }`,
//             },
//         });
//         const rocks = await response.json();
//         setUserRockState(rocks);
//     }
// }
