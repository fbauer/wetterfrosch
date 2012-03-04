test("a basic test example", function() {
  ok( true, "this test is fine" );
  var value = "hello";
  equal( value, "hello", "We expect value to be hello" );
    deepEqual([], [], "foo");
});

test("empty list", function() {
    var input = [];
    deepEqual(extractTemp(input), [], "Empty lists should be handled correctly");
});