function Submit() {
	$.post(
    "/calculate",
    {
      x: $("#x").val(),
      y: $("#y").val(),
      op: $("#op").val(),
    },
    function (data) {
      var text = "RESULT: " + (data.error ? data.error : data.answer);

      $("#result").text(text);
    }
  );
}