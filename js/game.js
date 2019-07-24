const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;              
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".game-field").removeClass('target');
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).removeClass("miss");
  // TODO: помечать target текущим номером
  $(".target").text(`${hits+1}`);
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1){firstHitTime = getTimestamp()}
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".grid-wrapper").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let totalScore = Math.round((10000 / totalPlayedSeconds) - (fails * 100));

  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-fails").text(fails);
  $("#total-score").text(totalScore);
  $("#win-message").removeClass("d-none");
  $("#button-reload").css('margin-left', '480px');
  $("#button-reload").text("Играть заново");

  $('#button-reload').click(function() {
    location.reload();
  });

}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(".target").text("");
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".game-field").removeClass('miss');
    } 
    else {
      $(event.target).addClass("miss");
      fails = fails +1; 
    }
    round();
  }

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);

