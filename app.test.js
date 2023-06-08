process.env.NODE_ENV = "test";

process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let itemns = require("./fakeDb");

const popcorn = {"name": "popcorn",
                "price": 2.00}

const butter = {"name": "butter",
                "price": 1.50}

beforeEach(function(){
    items.push(popcorn)
    items.push(butter)

})

afterEach(function(){
    items.splice(0, items.length)
})


describe("GET /items", function() {
    test("Gets a list of all items", async function() {
      const resp = await request(app).get(`/items`)
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual([popcorn, butter]);

    });
  });


  describe("POST /items", function() {
    test("Post a new item", async function() {
      const resp = await request(app).post(`/items`).send({"name": "water", "price": 1.00})
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({"added": {"name": "water", "price": 1.00}});
      const resp2 = await request(app).post('/items').send({})
      expect(resp2.statusCode).toBe(400)
      expect(resp2.body).toEqual({
        "error": {
          "message": "Please enter data",
          "status": 400
        }
      })
    

    });
  });


  describe("GET items/:name", function() {
    test("Get a specific Item", async function() {
      const resp = await request(app).get(`/items/butter`)
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual({"name": "butter", "price": 1.50});

    });
  });
  

  describe("Patch /items/:name", function() {
    test("Patch an item", async function() {
      const resp = await request(app).patch(`/items/butter`).send({"name": "new butter", "price": 1.20})
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({"updated": {"name": "new butter", "price": 1.20}});
      const resp2 = await request(app).patch('/items/thisisnotthere')
      expect(resp2.statusCode).toBe(404)
      expect(resp2.body).toEqual({
        "error": {
          "message": "This item cant be found",
          "status": 404
        }
      })
    });
  });


  describe("Delete /items/:name", function() {
    test("Delete an item", async function() {
      const resp = await request(app).delete(`/items/butter`)
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({ "message": "Deleted" });
      const resp2 = await request(app).patch('/items/thisisnotthere')
      expect(resp2.statusCode).toBe(404)
      expect(resp2.body).toEqual({
        "error": {
          "message": "This item cant be found",
          "status": 404
        }
      })
    });
  });