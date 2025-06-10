const request = require('supertest');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Import the express app setup (without the listen call)
// This is a modified version of what's in app.js
function createApp() {
  const app = express();
  
  // Set up EJS as the view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.use(expressLayouts);
  app.set('layout', 'layout');
  
  // Serve static files from the public directory
  app.use(express.static(path.join(__dirname, '..', 'public')));
  
  // Routes
  app.get('/', (req, res) => {
    res.render('index', { title: 'Kids Learning App - Home' });
  });
  
  app.get('/alphabet', (req, res) => {
    res.render('alphabet', { title: 'Learn the Alphabet' });
  });
  
  app.get('/numbers', (req, res) => {
    res.render('numbers', { title: 'Learn Numbers' });
  });
  
  app.get('/colors', (req, res) => {
    res.render('colors', { title: 'Learn Colors' });
  });
  
  app.get('/shapes', (req, res) => {
    res.render('shapes', { title: 'Learn Shapes' });
  });
  
  app.get('/animals', (req, res) => {
    res.render('animals', { title: 'Learn Animals' });
  });
  
  app.get('/birds', (req, res) => {
    res.render('birds', { title: 'Learn Birds' });
  });
  
  app.get('/wonders', (req, res) => {
    res.render('wonders', { title: 'Learn 7 Wonders' });
  });
  
  app.get('/plants', (req, res) => {
    res.render('plants', { title: 'Learn Plants' });
  });
  
  return app;
}

describe('Kids Learning App Routes', () => {
  let app;
  
  beforeEach(() => {
    app = createApp();
  });
  
  test('GET / should respond with 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /alphabet should respond with 200 status code', async () => {
    const response = await request(app).get('/alphabet');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /numbers should respond with 200 status code', async () => {
    const response = await request(app).get('/numbers');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /colors should respond with 200 status code', async () => {
    const response = await request(app).get('/colors');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /shapes should respond with 200 status code', async () => {
    const response = await request(app).get('/shapes');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /animals should respond with 200 status code', async () => {
    const response = await request(app).get('/animals');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /birds should respond with 200 status code', async () => {
    const response = await request(app).get('/birds');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /wonders should respond with 200 status code', async () => {
    const response = await request(app).get('/wonders');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /plants should respond with 200 status code', async () => {
    const response = await request(app).get('/plants');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /nonexistent-route should respond with 404 status code', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.statusCode).toBe(404);
  });
});

describe('Page Content Tests', () => {
  let app;
  
  beforeEach(() => {
    app = createApp();
  });
  
  test('Homepage should contain welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Kids Learning App');
  });
  
  test('Alphabet page should mention alphabet learning', async () => {
    const response = await request(app).get('/alphabet');
    expect(response.text).toContain('Learn the Alphabet');
  });
  
  test('Numbers page should mention number learning', async () => {
    const response = await request(app).get('/numbers');
    expect(response.text).toContain('Learn Numbers');
  });
  
  test('Colors page should mention color learning', async () => {
    const response = await request(app).get('/colors');
    expect(response.text).toContain('Learn Colors');
  });
  
  test('Shapes page should mention shape learning', async () => {
    const response = await request(app).get('/shapes');
    expect(response.text).toContain('Learn Shapes');
  });
  
  test('Animals page should mention animal learning', async () => {
    const response = await request(app).get('/animals');
    expect(response.text).toContain('Learn Animals');
  });
  
  test('Birds page should mention bird learning', async () => {
    const response = await request(app).get('/birds');
    expect(response.text).toContain('Learn Birds');
  });
  
  test('Wonders page should mention 7 wonders learning', async () => {
    const response = await request(app).get('/wonders');
    expect(response.text).toContain('Learn 7 Wonders');
  });
  
  test('Plants page should mention plant learning', async () => {
    const response = await request(app).get('/plants');
    expect(response.text).toContain('Learn Plants');
  });
});

describe('Static File Serving Tests', () => {
  let app;
  
  beforeEach(() => {
    app = createApp();
  });
  
  test('CSS files should be served correctly', async () => {
    const response = await request(app).get('/css/style.css');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/css/);
  });
  
  test('JavaScript files should be served correctly', async () => {
    const response = await request(app).get('/js/main.js');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/javascript|text\/javascript/);
  });
});

describe('Error Handling Tests', () => {
  let app;
  
  beforeEach(() => {
    app = createApp();
  });
  
  test('Multiple nonexistent routes should all return 404', async () => {
    // Test several nonexistent routes
    const routes = ['/invalid', '/fake-route', '/learning', '/test'];
    
    for (const route of routes) {
      const response = await request(app).get(route);
      expect(response.statusCode).toBe(404);
    }
  });
});

describe('Layout Tests', () => {
  let app;
  
  beforeEach(() => {
    app = createApp();
  });
  
  test('All pages should use the common layout', async () => {
    // Get all main routes
    const routes = ['/', '/alphabet', '/numbers', '/colors', '/shapes', '/animals', '/birds', '/wonders', '/plants'];
    
    for (const route of routes) {
      const response = await request(app).get(route);
      
      // If using a common layout, these elements should appear on all pages
      expect(response.text).toContain('<!DOCTYPE html>');
      expect(response.text).toMatch(/<html.*>/);
      expect(response.text).toMatch(/<head.*>/);
      expect(response.text).toMatch(/<body.*>/);
    }
  });
  
  test('All pages should include style.css', async () => {
    // Get all main routes
    const routes = ['/', '/alphabet', '/numbers', '/colors', '/shapes', '/animals', '/birds', '/wonders', '/plants'];
    
    for (const route of routes) {
      const response = await request(app).get(route);
      
      // Check if CSS is included
      expect(response.text).toMatch(/link.*css\/style\.css/);
    }
  });
});