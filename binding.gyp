{
  "targets": [
    {
      "target_name": "tinyfiledialogs-node",
      "cflags": ["-fPIC"],
      "cflags_cc": [
        "-fexceptions",
        "-Wall",
        "-Wextra",
        "-std=c++11"
      ],
      "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")", "cpp"],
      "defines": ["NAPI_CPP_EXCEPTIONS"],
      "sources": ["cpp/main.cc", "cpp/tinyfiledialogs.c"],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "WarningLevel": 0
            }
          }
        }],
        ["OS=='mac'", {
          "cflags_cc": ["-fexceptions"],
          "xcode_settings": {
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
          }
        }]
      ]
    }
  ]
}
