// console.log(Notification.permission);

(Notification.permission !== "granted") && (Notification.requestPermission());
// if (Notification.permission === "granted") {
//     alert("we have permission");
//  } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(permission => {
//        console.log(permission);
//     });
//  }

// console.log(Notification.permission !== "granted");