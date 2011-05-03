require 'capybara'
require 'capybara/dsl'

Capybara.default_driver = :selenium
World(Capybara)

Before do
  visit "http://127.0.0.1:8000"
  sleep 100
end