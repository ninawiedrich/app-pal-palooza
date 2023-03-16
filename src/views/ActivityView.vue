<template>
  <div>
    <h1>This is Activity</h1>
  </div>
</template>

async getAddData() { const q2 = query(collection(db, "addActivity")); const
userdetails = []; const querySnapshot = await getDocs(q2);
querySnapshot.forEach((doc) => { const userdetail = { id: doc.id, addActivity:
doc.data().addActivity, addAge: doc.data().addAge, addDate: doc.data().addDate,
addGender: doc.data().addGender, addLocation: doc.data().addLocation, addTime:
doc.data().addTime, addUsername: doc.data().username, };
userdetails.push(userdetail); }); this.userdata = userdetails;
console.log(this.userdata); }, },
