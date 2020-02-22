const request = require('request');
const path = require('path');
const fs = require ('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getTeams(dom, amount){
  let teams = [];
  for (let i = 0; i < amount; i++) {
    const row = dom.window.document.querySelector(`tbody .standing-table__row:nth-child(${i+1})`);
    const teamName = row.querySelector('.standing-table__cell:nth-child(2) a').innerHTML;;
    const teamGames = row.querySelector('.standing-table__cell:nth-child(3)').innerHTML;
    const teamPts = row.querySelector('.standing-table__cell:nth-child(10)').innerHTML;
    teams.push({teamName, teamGames, teamPts });
  }
  return teams;
}

function requestLigue(id){
  request(`https://www.skysports.com/${id}-table`, (err, res, body) => {
  if (err){
    console.log('Error: ', err);
    return;
  }
  const dom = new JSDOM(body);
  const teams = getTeams(dom, 5);
  console.log(id, teams);
});
}

const ligues = ['la-liga', 'premier-league', 'bundesliga'];
ligues.forEach(el => requestLigue(el));