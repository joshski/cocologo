Feature: Turtle
  In order to learn programming
  As an inhabitant of the real world
  I want to automate something physical
  
  @wip
  Scenario: Command the turtle with LOGO
    Given I have entered the following code:
      """
        pencolour red
        pendown
        forward 2
      """
    Then I should see 0 red pixels 
    When I tell the turtle to go
    Then I should see 2 red pixels
    When I tell the turtle to go
    Then I should see 4 red pixels
