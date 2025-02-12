#include <napi.h>
#include <tinyfiledialogs.h>
#include <vector>



// Function to show a popup message
Napi::Value Popup(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
     Napi::TypeError::New(env, "Expected two string arguments: title, message").ThrowAsJavaScriptException();
     return env.Null();
    }

    std::string title = info[0].As<Napi::String>();
    std::string message = info[1].As<Napi::String>();

    tinyfd_messageBox(title.c_str(), message.c_str(), "ok", "info", 0);

    return env.Null();
}






Napi::Value PickFile(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    std::vector<std::string> filters;
    std::vector<const char*> filterPatterns;

    if (info.Length() > 0 && info[0].IsArray()) {
        Napi::Array filtersArray = info[0].As<Napi::Array>();

        for (uint32_t i = 0; i < filtersArray.Length(); i++) {
        if (filtersArray.Get(i).IsString()) {
        filters.push_back(filtersArray.Get(i).As<Napi::String>().Utf8Value());
         }
        }
      }

    // Default to "*.*" if no filters provided
    if (filters.empty()) {
        filters.push_back("*.*");
    }

    // Convert to C-style strings
    for (const std::string& filter : filters) {
        filterPatterns.push_back(filter.c_str());
    }

    bool allowMultiple = (info.Length() > 1 && info[1].IsBoolean()) ? info[1].As<Napi::Boolean>().Value() : false;

    const char* filePath = tinyfd_openFileDialog(
     "Select a file",
     "",
     static_cast<int>(filterPatterns.size()),
     filterPatterns.data(),
     nullptr,
     allowMultiple ? 1 : 0
    );

    Napi::Array result = Napi::Array::New(env);
    if (!filePath) {
     return result; // Return an empty array if no file is selected
    }

    std::string paths(filePath);
    size_t pos = 0;
    uint32_t index = 0;

    while ((pos = paths.find('|')) != std::string::npos) {
     result.Set(index++, Napi::String::New(env, paths.substr(0, pos)));
     paths.erase(0, pos + 1);
    }

    result.Set(index, Napi::String::New(env, paths)); // Add last file
    return result;
}





// Function to pick a folder
Napi::Value PickFolder(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    std::string defaultPath = "";

    if (info.Length() > 0 && info[0].IsString()) {
        defaultPath = info[0].As<Napi::String>().Utf8Value();
    }

    const char* folderPath = tinyfd_selectFolderDialog("Select a folder", defaultPath.empty() ? NULL : defaultPath.c_str());

    if (!folderPath) {
        return env.Null();
    }

    return Napi::String::New(env, folderPath);
}






Napi::Value InputBox(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
        Napi::TypeError::New(env, "Expected at least two string arguments: title, message, [defaultInput]").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string title = info[0].As<Napi::String>();
    std::string message = info[1].As<Napi::String>();
    std::string defaultInput = (info.Length() > 2 && info[2].IsString()) ? info[2].As<Napi::String>() : Napi::String::From(env,"");

    const char* result = tinyfd_inputBox(title.c_str(), message.c_str(), defaultInput.empty() ? "" : defaultInput.c_str());

    if (!result) {
        return env.Null();
    }

    return Napi::String::New(env, result);
}





// Function to save a file
// Function to show a save file dialog with customizable filters
Napi::Value SaveFileDialog(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

       std::string filter = "";

        // Validate that filter argument is provided and is a string
        if (info.Length() > 0 && info[0].IsString()) {
            filter = info[0].As<Napi::String>().Utf8Value();
        }

        if (filter.empty()) {
            filter = "*.*";
        }


        std::string upper = std::string(filter);
        std::transform(upper.begin(), upper.end(),upper.begin(), ::toupper);


        const char* lFilterPatterns[1] = { filter.c_str() };

        const char* filePath = tinyfd_saveFileDialog(
            "Save File",
            "",
            1,
            lFilterPatterns,
            upper.c_str()
        );


        if (!filePath) {
            return env.Null();
        }

        return Napi::String::New(env, filePath);

}



// Module initialization
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("popup", Napi::Function::New(env, Popup));
    exports.Set("pickFile", Napi::Function::New(env, PickFile));
    exports.Set("pickFolder", Napi::Function::New(env, PickFolder));
    exports.Set("inputBox", Napi::Function::New(env, InputBox));
    exports.Set("saveFileDialog", Napi::Function::New(env, SaveFileDialog));

    return exports;
}

NODE_API_MODULE(addon, Init);
