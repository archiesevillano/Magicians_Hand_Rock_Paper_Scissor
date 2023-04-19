import Music from "./sound.js";

const loaderScreen = document.querySelector('.loader-container');
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        createMatch(); //Start Game
        setTimeout(() => {
            loaderScreen.style.display = "none";
            Music("assets/sounds/Bachs-Bouree-In-Celtic-Minor.mp3");
        }, 5000);

    }
});

const skillTypes = [
    {
        skillName: "rock",
        skillImage: "assets/objects/skills/rock_borderless.png",
    },
    {
        skillName: "paper",
        skillImage: "assets/objects/skills/paper_borderless.png",
    },
    {
        skillName: "scissor",
        skillImage: "assets/objects/skills/scissor_borderless.png",
    },
];


//Match Details
const matchDetails = {
    currentRound: 1,
    maxRounds: 3,
}

function updateMatch() {
    const current = document.querySelector(".current-round");
    const max = document.querySelector(".max-round");

    current.textContent = matchDetails.currentRound;
    max.textContent = matchDetails.maxRounds;
}

function createMatch() {
    //trigger when user hit the start button
    updateMatch();
    updateHealth();
}


//Players
class CreatePlayer {
    constructor(playerID, playerName) {
        const pID = playerID;
        const pName = playerName;
        this.wins = 0;
        this.lose = 0;
        this.health = 100;
        this.landedAttacks = 0;
        this.missedAttacks = 0;
    }

    increaseWin() {
        return this.wins++;
    }

    increaseLose() {
        return this.lose++;
    }

    increaseLanded() {
        this.landedAttacks++;
    }

    increaseMissed() {
        this.missedAttacks++;
    }

    resetScores() {
        this.wins = 0;
        this.lose = 0;
    }

    getTotalMatch() {
        return this.wins + this.lose;
    }

    getID() {
        return playerID;
    }

    getName() {
        return playerName;
    }

    inflictDamage(damage) {
        this.health -= damage;
        updateHealth();
    }

    getHealth() {
        return this.health;
    }

    resetHealth() {
        this.health = 100;
        updateHealth();
    }
}

const PLAYER_1 = new CreatePlayer("65555255", "Player1");
const PLAYER_2 = new CreatePlayer("64475255", "Player2");
const p1_hb = document.querySelector(".player1-hb");
const p2_hb = document.querySelector(".player2-hb");
const p1Stat_win = document.querySelector(".p1-match-wins");
const p2Stat_win = document.querySelector(".p2-match-wins");
const p1Stat_lose = document.querySelector(".p1-match-lose");
const p2Stat_lose = document.querySelector(".p2-match-lose");
const p1_la_val = document.querySelector(".player1-la-value");
const p1_ma_val = document.querySelector(".player1-ma-value");
const p1_total_val = document.querySelector(".player1-total-value");
const p2_la_val = document.querySelector(".player2-la-value");
const p2_ma_val = document.querySelector(".player2-ma-value");
const p2_total_val = document.querySelector(".player2-total-value");

function updateHealth() {
    let p1val = PLAYER_1.getHealth() < 0 ? 0 : PLAYER_1.getHealth();
    let p2val = PLAYER_2.getHealth() < 0 ? 0 : PLAYER_2.getHealth();

    p1_hb.style.width = p1val + "%";
    p2_hb.style.width = p2val + "%";
}

function updateStat() {
    p1Stat_win.textContent = PLAYER_1.wins;
    p1Stat_lose.textContent = PLAYER_1.lose;

    p2Stat_win.textContent = PLAYER_2.wins;
    p2Stat_lose.textContent = PLAYER_2.lose;

    p1_la_val.textContent = PLAYER_1.landedAttacks;
    p2_la_val.textContent = PLAYER_2.landedAttacks;
    p1_ma_val.textContent = PLAYER_1.missedAttacks;
    p2_ma_val.textContent = PLAYER_2.missedAttacks;
    p1_total_val.textContent = PLAYER_1.landedAttacks + PLAYER_1.missedAttacks;
    p2_total_val.textContent = PLAYER_2.landedAttacks + PLAYER_2.missedAttacks;
}

//RANDOMIZE
function randomize(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}



// MATCH HISTORY
const view_match_details_btn = document.querySelector('.view-match-details');
const match_details = document.querySelector(".match-details-container");
const cls_match_details_btn = document.querySelector(".cls-match-history-btn");


//Add button functions
view_match_details_btn.addEventListener('click', () => match_details.style.bottom = "0");
cls_match_details_btn.addEventListener('click', () => match_details.style.bottom = "-1000px");


//Player Skills
const skill_btns = document.querySelectorAll('.p1-skill');
skill_btns.forEach(button => button.addEventListener('click', checkMatchResult));
const attackDamage = (skillMinDmg, skillMaxDmg) => randomize(skillMinDmg, skillMaxDmg);

function hideSkills() {
    const player1Skills = document.querySelector(".player1-skills");
    const player2Skills = document.querySelector(".player2-skills");

    player1Skills.style.left = "var(--hide-value)";
    player2Skills.style.right = "var(--hide-value)";

    console.log("Hide Skills");
}

function showSkills() {
    const player1Skills = document.querySelector(".player1-skills");
    const player2Skills = document.querySelector(".player2-skills");

    player1Skills.style.left = "0";
    player2Skills.style.right = "0";
}

function pick(eObj) {
    let storedPick = eObj.target.parentElement.getAttribute("data-pick-type");

    switch (storedPick) {
        case "rock":
            return skillTypes[0];
            break;
        case "paper":
            return skillTypes[1];
            break;
        case "scissor":
            return skillTypes[2];
            break;
        default:
            return "Error";
    }
}

function ai_pick() {
    return skillTypes[randomize(0, 2)];
}

//Returns true if player1 won the match
function match(player1, player2) {

    console.log(`${player1.skillName} vs ${player2.skillName}`);
    if (player1.skillName == player2.skillName) {
        let dmg = attackDamage(20, 40);
        return { result: "Miss", damage: dmg };
    }
    else if (player1.skillName == skillTypes[1].skillName && player2.skillName == skillTypes[0].skillName) {
        let dmg = attackDamage(20, 40);
        return { result: true, damage: dmg };
    }
    else if (player1.skillName == skillTypes[2].skillName && player2.skillName == skillTypes[1].skillName) {
        let dmg = attackDamage(20, 40);
        return { result: true, damage: dmg };
    }
    else if (player1.skillName == skillTypes[0].skillName && player2.skillName == skillTypes[2].skillName) {
        let dmg = attackDamage(20, 40);
        return { result: true, damage: dmg };
    }
    else {
        let dmg = attackDamage(20, 40);
        console.log("Player 2 won");
        return { result: false, damage: dmg };
    }

}

function checkMatchResult(e) {

    hideSkills(); // Hide players skill set once a skill is picked

    const miss = document.querySelector(".miss-text");
    const p1Skill = document.querySelector(".player1-skill-container");
    const p2Skill = document.querySelector(".player2-skill-container");
    const vsText = document.querySelector(".versus-text");
    const capitalize = text => text[0].toUpperCase() + text.substring(1);
    let player1 = pick(e);
    let player2 = ai_pick();
    let matchRes = match(player1, player2);
    let count = 3;

    //Set Image for Selected Skills
    p1Skill.firstElementChild.src = player1.skillImage;
    p2Skill.firstElementChild.src = player2.skillImage;

    const timer = setInterval(() => {
        vsText.textContent = count < 0 ? "V.S" : count;
        count--;
        console.log(count);
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        p1Skill.style.transform = "scale(1)";
        p2Skill.style.transform = "scale(1)";

    }, 5000);

    setTimeout(() => {
        p1Skill.style.transform = "scale(0)";
        p2Skill.style.transform = "scale(0)";

        switch (matchRes.result) {
            case "Miss":
                PLAYER_1.increaseMissed();
                PLAYER_2.increaseMissed();
                miss.style.display = "inline-block";
                updateStat();
                logMatchHistoryResult(matchRes.result, matchRes.result, `${capitalize(player1.skillName)} vs ${capitalize(player2.skillName)}`, matchRes.damage);
                break;
            case true:
                PLAYER_2.inflictDamage(matchRes.damage);
                PLAYER_1.increaseLanded();
                PLAYER_2.increaseMissed();
                updateStat();
                logMatchHistoryResult("Win", "Lose", `${capitalize(player1.skillName)} vs ${capitalize(player2.skillName)}`, matchRes.damage);
                break;
            case false:
                PLAYER_1.inflictDamage(matchRes.damage);
                PLAYER_1.increaseMissed();
                PLAYER_2.increaseLanded();
                updateStat();
                logMatchHistoryResult("Lose", "Win", `${capitalize(player1.skillName)} vs ${capitalize(player2.skillName)}`, matchRes.damage);
                break;
            default:
                PLAYER_1.increaseMissed();
                PLAYER_2.increaseMissed();
                updateStat();
                logMatchHistoryResult("Error Occured", "Error Occured", "Error Occured", "Error Occured");
                console.log("Error Occured");
        }
    }, 10000);

    setTimeout(() => {
        miss.style.display = "none";
        if (matchDetails.currentRound < matchDetails.maxRounds && (PLAYER_1.getHealth() <= 0 || PLAYER_2.getHealth() <= 0)) {
            matchDetails.currentRound++;
            console.log(`${PLAYER_1.getHealth()} : ${PLAYER_2.getHealth()}`);
            //check the round winner
            if (PLAYER_1.getHealth() <= 0) {
                PLAYER_2.increaseWin();
                PLAYER_1.increaseLose();
                PLAYER_1.resetHealth();
                updateStat();
            }
            else if (PLAYER_2.getHealth() <= 0) {
                PLAYER_1.increaseWin();
                PLAYER_2.increaseLose();
                PLAYER_2.resetHealth();
                updateStat();
            }
            else {
                console.log("Unknown Error occured");
            }
        }
        else {
            if (matchDetails.currentRound == matchDetails.maxRounds) {
                if (PLAYER_1.wins > PLAYER_2.wins) {
                    showResultDialog("You won this match!", PLAYER_1.landedAttacks, PLAYER_1.missedAttacks, PLAYER_1.wins, PLAYER_1.lose);
                }
                else if (PLAYER_1.wins < PLAYER_2.wins) {
                    showResultDialog("Player 2 won this match!", PLAYER_2.landedAttacks, PLAYER_2.missedAttacks, PLAYER_2.wins, PLAYER_2.lose);
                }
                else if (PLAYER_1.wins == PLAYER_2.wins) {
                    showResultDialog("Game Draw", PLAYER_1.landedAttacks, PLAYER_1.missedAttacks, PLAYER_1.wins, PLAYER_1.lose);
                }
                else {
                    alert("error occured");
                    showResultDialog("Error Occured", PLAYER_1.landedAttacks, PLAYER_1.missedAttacks, PLAYER_1.wins, PLAYER_1.lose);
                }
            }
        }
        showSkills();
        updateMatch();
    }, 15000);
}

//Match History
function logMatchHistoryResult(p1, p2, versus, dmg) {
    const logTable = document.querySelector("#match-history-records");
    let totalRecord = logTable.childElementCount;

    if (totalRecord == 1) {
        if (logTable.firstElementChild.id == "placeholder-record") {
            logTable.firstElementChild.remove();
        }
    }

    //Create Table Row
    const newRow = document.createElement('tr');
    newRow.id = `matchRecord${totalRecord++}`;

    //Create Table Data
    const p1Outcome = document.createElement('td');
    p1Outcome.className = "player1-outcome";
    p1Outcome.textContent = p1;

    const p2Outcome = document.createElement('td');
    p2Outcome.className = "player2-outcome";
    p2Outcome.textContent = p2;

    const vsMatch = document.createElement('td');
    vsMatch.className = "versus-match";
    vsMatch.textContent = versus;

    const winnerDmg = document.createElement('td');
    winnerDmg.className = "winner-damage";
    winnerDmg.textContent = dmg;


    //Add all table data to our newly created row
    newRow.appendChild(p1Outcome);
    newRow.appendChild(p2Outcome);
    newRow.appendChild(vsMatch);
    newRow.appendChild(winnerDmg);
    logTable.appendChild(newRow);
}

function showResultDialog(result, pla, pma, wn, ls) {
    //containers
    const m_area = document.createElement('div');
    const modal = document.createElement('div');
    const m_img_container = document.createElement('div');
    const m_body = document.createElement('div');
    const stat_container = document.createElement('div');
    const stat_row1 = document.createElement('div');
    const stat_row2 = document.createElement('div');

    //child elements
    const image = document.createElement('img');
    const m_over = document.createElement('p');
    const heading_result = document.createElement('h1');
    const p_la = document.createElement('p');
    const p_ma = document.createElement('p');
    const wins = document.createElement('p');
    const loses = document.createElement('p');
    const ok_btn = document.createElement('button');

    //Adding classes
    m_area.className = "modal-area";
    modal.className = "modal-box";
    m_img_container.className = "modal-image-container";
    m_body.className = "modal-body";
    stat_container.className = "match-stat";
    stat_row1.className = "stat-row";
    stat_row2.className = "stat-row";
    image.className = "skull";
    image.src = "assets/objects/extras/skull.png";
    ok_btn.className = "modal-btn";

    //adding text content
    m_over.textContent = "Match Over";
    heading_result.textContent = result;
    p_la.textContent = `Landed Attacks: ${pla}`;
    p_ma.textContent = `Missed Attacks: ${pma}`;
    wins.textContent = `Win: ${wn}`;
    loses.textContent = `Lose: ${ls}`;
    ok_btn.textContent = "OK";
    ok_btn.addEventListener('click', () => {
        m_area.remove();
        location.href = "index.html";
    });

    //append childs
    stat_row1.appendChild(p_la);
    stat_row1.appendChild(p_ma);

    stat_row2.appendChild(wins);
    stat_row2.appendChild(loses);

    stat_container.appendChild(stat_row1);
    stat_container.appendChild(stat_row2);

    m_body.appendChild(m_over);
    m_body.appendChild(heading_result);
    m_body.appendChild(stat_container);
    m_body.appendChild(ok_btn);

    m_img_container.appendChild(image);

    modal.appendChild(m_img_container);
    modal.appendChild(m_body);

    m_area.appendChild(modal);
    document.body.appendChild(m_area);
}