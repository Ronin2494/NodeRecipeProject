$(document).ready( function() {

  var counter_ingredient = 1;
  var counter_procedure = 1;

  $("#addrow_ingredient").on("click", function () {
      var newRow = $("<tr>");
      var cols = "";

      cols += '<td><input type="text" class="form-control" name="ingredient_name' + counter_ingredient + '"/></td>';
      cols += '<td><input type="text" class="form-control" name="measurement' + counter_ingredient + '"/></td>';
      cols += '<td><input type="text" class="form-control" name="unit' + counter_ingredient + '"/></td>';

      cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
      newRow.append(cols);
      $("#myTable_ingredient").append(newRow);
      counter_ingredient++;
  });

  $("#myTable_ingredient").on("click", ".ibtnDel", function (event) {
      $(this).closest("tr").remove();       
      counter_ingredient -= 1
  });


  $("#addrow_procedure").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";

    cols += '<td><input type="text" class="form-control" name="step_no' + counter_procedure + '"/></td>';
    cols += '<td><input type="text" class="form-control" name="procedure_description' + counter_procedure + '"/></td>';
    
    cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
    newRow.append(cols);
    $("#myTable_procedure").append(newRow);
    counter_procedure++;
});


  $("#myTable_procedure").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();       
    counter_procedure -= 1
});
});