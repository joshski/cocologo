def cake_build
  system("clear")
  puts "> cocologo [cake watch] @ #{Time.now.strftime('%H:%M:%S')}"
  
  system("cake compile spec")
  
  if ARGV.size > 2
    command = ARGV[1..-1].join(" ")
    puts "> #{command}"
    system(command)
  end
end

cake_build
watch("(.*\.(coffee|rb|feature|jison)|Cakefile)") do |m|
  cake_build
end

@interrupted = false

# Ctrl-C
Signal.trap "INT" do
  if @interrupted
    abort("\n")
  else
    puts "Interrupt a second time to quit"
    @interrupted = true
    Kernel.sleep 1.5
    cake_build
    @interrupted = false
  end
end