var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
const should = require('should');
const { expect } = require('chai');

chai.use(chaiHttp);

//all tests for users 
describe('Users', function() {
    it('should add a single user on POST request for /addUser', function(done) {
        chai.request(server).post('/addUser')
        .send({'uFirstName' : 'Bob ', 'uLastName': 'The builder', 'uPhoneNum': '6041230000', 'uAddress': 'Surrey', 'uEmail': 'bob9@gmail.com', 'uPassword': 'build4lyfe'})
        .end(function(error, res) {
            if (error) console.log(error);
            res?.body[0]?.uFirstName?.should.equal('Bob');
            res?.body[0]?.uLastName?.should.equal('The builder');
            res?.body[0]?.uPhoneNum?.should.equal('6041230000');
            res?.body[0]?.uAddress?.should.equal('Surrey');
            res?.body[0]?.uEmail?.should.equal('bob9@gmail.com');
            res?.body[0]?.uPassword?.should.equal('build4lyfe');
        })
        done();
    })
    it('should increment the number of users by 1 when a user is added successfully, POST request for /addUser', function(done) {
        chai.request(server).get('/allData').end(function(err, res) {
            var numOfUsers = res?.body?.allUsers?.length;
            // console.log("oldnum: ", numOfUsers);
            chai.request(server).post('/addUser')
            .send({'uFirstName' : 'Billy ', 'uLastName': 'Joe', 'uPhoneNum': '6041112222', 'uAddress': 'Burnaby', 'uEmail': 'billy121@gmail.com', 'uPassword': 'billyiscool'})
            .end(function(error, res) {
                chai.request(server).get('/allData').end(function(err, res) {
                    var newNumOfUsers = res?.body?.allUsers?.length;
                    var difference = newNumOfUsers - numOfUsers;
                    difference.should.equal(5);
                });
            });
            done();
        })
    })
    it('should decrement the number of users by 1 when a user is successfully deleted, POST request for /deleteUser', (done) => {
        chai.request(server).get('/allData').end(function(err, res) {
            var numOfUsers = res?.body?.allUsers?.length;
            chai.request(server).post('/deleteUser/bob9@gmail.com').end(function(error, res) {
                chai.request(server).get('/allData').end(function(err, result) {
                    var newNumOfUsers = result?.body?.allUsers?.length;
                    (numOfUsers - newNumOfUsers).should.equal(1);
                });
            });
            done();
        })
    })
    it('should edit the profile picture of user and return no errors', function(done) {
        const profileToBeEditedPic = {
            username: 'bottle@gmail.com',
            newProfilePic: 'https://adoptify-posts.s3.us-west-2.amazonaws.com/harry.potter123%40gmail.com-23.jpg'
        }
        chai.request(server).post('/editProfilePic').send(profileToBeEditedPic).end(function (err, res) {
            expect(res).to.exist;
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        })
        done();
    })
    it('should edit the user details with database and return no errors', function(done) {
        const newDetails = {
            username: 'a@mla.com',
            password: '@password222',
            firstname: 'Amy',
            lastname: 'Jones',
            address: 'Coquitlam',
            phone: '6041110101'
        }
        chai.request(server).post('/editUser').send(newDetails).end(function (err, res) {
            expect(res).to.exist;
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        })
        done();
    })
    it('should login user if they enter the right credentials and throw no errors', function(done) {
        const login = {
            username: 'bottle@gmail.com',
            password: 'lew'
        }
        chai.request(server).post('/login').send(login).end(function (err, res) {
            expect(res).to.exist;
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        })
        done();
    })
    it('should redirect an authorized user to the admin page and show no errors', function(done) {
        const user = {
            username: 'harry.potter123@gmail.com',
            isadmin: true
        }
        chai.request(server).get('/admin').send(user).end(function (err, res) {
            expect(res).to.exist;
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        })
        done();
    })
    it('should take user to profile page and display profile details, should give no errors', function(done) {
        chai.request(server).get('/profile/matt@gmail.com').end(function (err, res) {
            expect(res).to.exist;
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        })
        done();
    })
})


//TESTS RELATING TO POSTS
describe('Posts', function() {
    it('should add a post on POST request for /addPost', function(done) {
        chai.request(server).post('/addPost')
        .send({'username': 'coffee@gmail.com', 'petName': 'Cranky', 'petSpecies': 'Dog', 'petColor': 'Black', 'petDescription': 'Do not mess with him, trust me.', 'petImage': 'https://adoptify-posts.s3.us-west-2.amazonaws.com/harry.potter123%40gmail.com-3.jpg'})
        .end(function(err, res) {
            res.body[0].username.should.equal('coffee@gmail.com');
            res.body[0].petName.should.equal('Cranky');
            res.body[0].petSpecies.should.equal('Dog');
            res.body[0].petColor.should.equal('Black');
            res.body[0].petDescription.should.equal('Do not mess with him, trust me.');
            res.body[0].petImage.should.equal('https://adoptify-posts.s3.us-west-2.amazonaws.com/harry.potter123%40gmail.com-3.jpg');
        })
        done();
    })
    it('should edit the details of a post and give no errors', function(done) {
        const editingPost = {
            id: '49',
            name: 'Sam',
            species: 'Dog',
            color: 'Yellow',
            des: 'He is yellow do not question it'
        }
        chai.request(server).post('/editPost').send(editingPost).end(function (err, res) {
            expect(res).to.exist;
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        })  
        done();
    })
    it('should increment the number of posts by 1 when a post is added successfully, POST request for /addPost', function(done) {
        chai.request(server).get('/allData').end(function (err, res) {
            var numPosts = res.body.allPosts.length;
            chai.request(server).post('/deletePost/59').end(async function (err, res1) {
                var newNum = await res1.body.allPosts.length;
                console.log("newNum: ", newNum);
                (numPosts - newNum).should.equal(1);
            })
        })
        done();
    })
    it('should edit the post image and give no errors', function(done) {
        postWithNewImage = {
            username: 'bottle@gmail.com',
            id: '49',
            newPostPic: 'https://adoptify-posts.s3.us-west-2.amazonaws.com/harry.potter123%40gmail.com-23.jpg'
        }
        chai.request(server).post('/editPostImage').send(postWithNewImage).end(function (err, res) {
            expect(res).to.exist;
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        })
        done();
    })
})