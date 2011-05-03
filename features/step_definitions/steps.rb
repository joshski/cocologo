Given /^I have entered the following code:$/ do |code|
  fill_in "code", :with => code.split("\n").map { |l| l.strip }.join("\n")
end

When /^I tell the turtle to go$/ do
  click_button "go"
end

Then /^I should see (\d+) red pixels?$/ do |count|
  sleep 1
  js = "return (function() {
      var canvas = document.getElementById('lineCanvas');
      var context = canvas.getContext('2d');
      var data = context.getImageData(
        (canvas.width/2) - 5, (canvas.height/2) - 5, 10, 10).data;
      var redPixels = 0;
      for (var i = 0; i < data.length; i+=4) {
        if (data[i] == 255 &&
            data[i+1] == 0 &&
            data[i+2] == 0 &&
            data[i+3] == 255) {
          redPixels++;
        }
      }
      return redPixels;
    })()"
  page.execute_script(js).should == count.to_i
  sleep 20
end