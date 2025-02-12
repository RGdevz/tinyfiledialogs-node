
target("tinyfiledialogs-node")
do
    set_languages("cxx17")
    add_rules("nodejs.module")

    add_includedirs("node_modules/node-addon-api", "node_modules/node-api-headers/include","cpp")

    add_links("node","user32.lib",'ole32.lib','comdlg32.lib','shell32.lib') 


    add_files("cpp/*.cc","cpp/*.c")


end