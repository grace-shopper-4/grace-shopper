const Chance = require('chance');
const chance = new Chance();
// chance is an npm module for creating almost any kind of fake data

const { Product, Category, User, Order, Review } = require('../server/db/models')

// let campusImgs = [
//     'https://static.pexels.com/photos/2422/sky-earth-galaxy-universe.jpg',
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg',
//     'http://nineplanets.org/images/themoon.jpg',
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/PIA20016-SaturnMoon-Titan-20151113.jpg/220px-PIA20016-SaturnMoon-Titan-20151113.jpg',    
// ]
let productsArr = [];
for (let i = 0; i < 12; i++) {
    productsArr.push(new Promise((res, rej) => {
        let title = chance.word({length: 5});
        let description = chance.paragraph();
        let price = chance.dollar({max: 100});
        let inventory = chance.integer({min: 1, max: 100});
        let size = Math.floor(Math.random() * (13) + 1);
        return Product.create({
            title,
            description,
            price,
            inventory,
            size
        })
        .then(newProduct => {
            console.log(newProduct.title + ' seeded!')
        })
        .catch(err => console.error(err));
    }))
}

// let studentPromiseArr = [];
// for (let i = 0; i < 35; i++) {
//     studentPromiseArr.push(new Promise((res, rej) => {
//         let randFirst = chance.first();
//         let randLast = chance.last();
//         let randEmail = randFirst + '.' + randLast + '@mhiaj.com';
//         let randGPA = chance.floating({min: 1.5, max: 4, fixed: 1});
//         let randCampusId = Math.floor(Math.random() * (4)) + 1;
//         Student.create({
//             firstName: randFirst,
//             lastName: randLast,
//             email: randEmail,
//             gpa: randGPA,
//             campusId: randCampusId
//         })
//         .then(newStudent => {
//             console.log(newStudent.name + ' seeded!');
//         })
//         .catch(err => console.error(err));
//     }));
// }

    



