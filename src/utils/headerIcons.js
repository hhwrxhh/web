// const [user, setUser] = React.useState(false);
// const [admin, setAdmin] = React.useState(false);

// const tokenStr = sessionStorage.getItem("token");

// const fetchData = async () => {
//   try {
//     const userType = await checkUser(tokenStr);
//     if (userType === "admin") {
//       setAdmin(true);
//       setUser(false);
//     } else if (userType === "user") {
//       setUser(true);
//       setAdmin(false);
//     }
//   } catch (error) {
//     console.log("Error", error);
//   }
// };
// fetchData();
// if (user) {
//   dispatch(insertIconsArray([...iconsArray, "arrow-right-from-bracket"]));
//   iconsArray.push(faArrowRightFromBracket);
//   setIcons([...iconsArray]);

//   if (location.pathname === "/profile") {
//     dispatch(insertIconsArray([...iconsArray]));
//     setIcons([...iconsArray]);
//   }
// }
// if (admin) {
//   routes.map((route) => {
//     dispatch(insertIconsArray([...iconsArray, "arrow-right-from-bracket"]));
//     setIcons([faUsers, "arrow-right-from-bracket"]);
//   });
//   if (location.pathname === "/admin") {
//     dispatch(insertIconsArray([...iconsArray, "arrow-right-from-bracket"]));
//     setIcons([faUsers, "arrow-right-from-bracket"]);
//   }
// }

// if (location.pathname === "/products") {
//   let indexPillsIcon = iconsArray.indexOf("fa-pills");

//   if (indexPillsIcon) {
//     dispatch(
//       insertIconsArray([...iconsArray.splice(indexPillsIcon, 1), "fa-filter"])
//     );
//     setIcons([...iconsArray, "fa-filter"]);
//   } else {
//     console.log("Coud not find icon Pills");
//   }
// } else {
//   dispatch(insertIconsArray([...iconsArray]));
//   setIcons([...iconsArray]);
// }
