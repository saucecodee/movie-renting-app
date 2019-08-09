const fs = require('fs')
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
const users = data.users

class User {
     constructor() {
          this.userId;
          this.name;
          this.email;
          this.password;
          this.number;
          this.address;
     }

     getUsers() {
          return data.users
     }

     findUser(id) {
          var i;
          users.forEach((user, index) => {
               if (user.id == id) {
                    i = index
               }
          });

          return { user: users[i], id: i } || "Nothing found"
     }

     addUser(user) {
          users.push(JSON.parse(user))
          fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
               if (err) console.log(err);
          });
          return `${user.name} added successfully`
     }

     updateUser(id, user) {
          let ind = this.findUser(id).id || null;
          if (ind){
               users.splice(ind, 1, JSON.parse(user))
               fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
                    if (err) console.log(err);
               });
               return `${users[ind].name} was edited`
          }else{
               return "User dosen't exist"
          }
     }

     deleteUser(id) {
          let ind = this.findUser(id).id
          let name = users[ind]
          users.splice(ind, 1)
          fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
               if (err) console.log(err);
          });
          return `${name}`
     }

     getCount() {
          return users.length
     }
}

module.exports = new User