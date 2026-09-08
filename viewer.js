// ======================================================
// MILLERKNOLL CONFIGURATOR
// viewer.js
// ======================================================


// ======================================================
// SKETCHFAB MODEL
// ======================================================

const MODEL_UID = "c3c8d73f65324bae8deec5097b9acca2";

const iframe = document.getElementById("api-frame");

const client = new Sketchfab("1.12.1", iframe);


// ======================================================
// LAMINATE TEXTURES
// ======================================================

const laminateTextures = {

    "LBB":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Laminate/LBB.jpg",

    "LBC":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Laminate/LBC.jpg",

    "Aged-Ash":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Laminate/Aged-Ash.jpg",

    "Grey-Ash":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Laminate/Grey-Ash.jpg"

};


// ======================================================
// FABRIC PANEL TEXTURES
// ======================================================

const fabricPanelTextures = {

    "1AX01":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Fabric-Panel/1AX01.jpg",

    "1HA13":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Fabric-Panel/1HA13.jpg",

    "1AX05":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Fabric-Panel/1AX05.jpg",

    "1AL01":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Fabric-Panel/1AL01.jpg"

};


// ======================================================
// SCREEN TEXTURES
// ======================================================

const screenTextures = {

    "1AL2":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Screen/1AL2.jpg",

    "1HA22":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Screen/1HA22.jpg",

    "1HA25":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Screen/1HA25.jpg",

    "4SC10":
        "https://raw.githubusercontent.com/kirti15g-cloud/MK-Configurator-New/main/images/Screen/4SC10.jpg"

};


// ======================================================
// METAL COLORS
// ======================================================

const metalColors = {

    "White91": [0.91, 0.91, 0.91, 1],

    "MS": [0.45, 0.45, 0.45, 1],

    "G1": [0.15, 0.15, 0.15, 1],

    "CL": [0.65, 0.65, 0.65, 1]

};


// ======================================================
// START SKETCHFAB VIEWER
// ======================================================

client.init(MODEL_UID, {

    success: function(api) {

        window.sketchfabAPI = api;

        api.start(function() {

            console.log("=================================");
            console.log("MILLERKNOLL CONFIGURATOR READY");
            console.log("=================================");


            // ==================================================
            // SHOW ALL MATERIAL NAMES
            // ==================================================

            api.getMaterialList(function(err, materials) {

                if (err) {

                    console.error(
                        "Could not get Sketchfab materials."
                    );

                    return;

                }


                console.log("=================================");
                console.log("SKETCHFAB MATERIAL LIST");
                console.log("=================================");


                materials.forEach(function(material, index) {

                    console.log(
                        index + " : " + material.name
                    );

                });


                console.log("=================================");

            });

        });

    },


    error: function() {

        console.error(
            "Sketchfab Viewer Failed to Load."
        );

    }

});


// ======================================================
// CHANGE MATERIAL
// ======================================================

window.changeMaterial = function(materialName, finish) {

    console.log("=================================");
    console.log("CHANGING MATERIAL:", materialName);
    console.log("SELECTED FINISH:", finish);
    console.log("=================================");


    // ==================================================
    // CHECK IF SKETCHFAB IS READY
    // ==================================================

    if (!window.sketchfabAPI) {

        console.error(
            "Sketchfab API is not ready."
        );

        return;

    }


    // ==================================================
    // GET MATERIAL LIST
    // ==================================================

    window.sketchfabAPI.getMaterialList(

        function(err, materials) {

            if (err) {

                console.error(
                    "Could not get materials."
                );

                return;

            }


            // ==================================================
            // FIND MATERIAL
            // ==================================================

            const material = materials.find(

                function(mat) {

                    return mat.name === materialName;

                }

            );


            // ==================================================
            // MATERIAL NOT FOUND
            // ==================================================

            if (!material) {

                console.error(
                    "MATERIAL NOT FOUND:",
                    materialName
                );

                console.log(
                    "AVAILABLE MATERIALS:"
                );

                materials.forEach(function(mat) {

                    console.log(mat.name);

                });

                return;

            }


            console.log(
                "MATERIAL FOUND:",
                material.name
            );


            // ==================================================
            // LAMINATE
            // ==================================================

            if (materialName === "adskMatLaminate") {

                const textureURL =
                    laminateTextures[finish];


                if (!textureURL) {

                    console.error(
                        "LAMINATE TEXTURE NOT FOUND:",
                        finish
                    );

                    return;

                }


                applyTexture(
                    material,
                    textureURL,
                    finish,
                    materialName
                );

                return;

            }


            // ==================================================
            // FABRIC PANEL
            // ==================================================

            if (materialName === "adskMatFabric_Panel") {

                const textureURL =
                    fabricPanelTextures[finish];


                if (!textureURL) {

                    console.error(
                        "FABRIC PANEL TEXTURE NOT FOUND:",
                        finish
                    );

                    return;

                }


                applyTexture(
                    material,
                    textureURL,
                    finish,
                    materialName
                );

                return;

            }


            // ==================================================
            // SCREEN
            // ==================================================

            if (materialName === "adskMatScreen") {

                const textureURL =
                    screenTextures[finish];


                if (!textureURL) {

                    console.error(
                        "SCREEN TEXTURE NOT FOUND:",
                        finish
                    );

                    return;

                }


                applyTexture(
                    material,
                    textureURL,
                    finish,
                    materialName
                );

                return;

            }


            // ==================================================
            // METAL
            // ==================================================

            if (materialName === "adskMatMetal") {

                applyMetalColor(
                    material,
                    finish
                );

                return;

            }


            // ==================================================
            // UNKNOWN MATERIAL
            // ==================================================

            console.error(
                "NO CONFIGURATION FOUND FOR:",
                materialName
            );

        }

    );

};


// ======================================================
// APPLY TEXTURE
// ======================================================

function applyTexture(
    material,
    textureURL,
    finish,
    materialName
) {

    console.log("=================================");
    console.log("LOADING TEXTURE");
    console.log(textureURL);
    console.log("=================================");


    // ==================================================
    // SAVE ORIGINAL TEXTURE SETTINGS
    //
    // The original material already contains the setup
    // coming from the GLB / Sketchfab model.
    //
    // We copy those settings and replace only the UID.
    // ==================================================

    let originalTexture = {};


    if (
        material.channels &&
        material.channels.AlbedoPBR &&
        material.channels.AlbedoPBR.texture
    ) {

        originalTexture = {

            ...material.channels.AlbedoPBR.texture

        };

    }


    // ==================================================
    // LOAD NEW TEXTURE
    // ==================================================

    window.sketchfabAPI.addTexture(

        textureURL,

        function(err, textureUID) {

            if (err) {

                console.error(
                    "TEXTURE FAILED TO LOAD:",
                    err
                );

                return;

            }


            console.log(
                "TEXTURE LOADED SUCCESSFULLY"
            );

            console.log(
                "TEXTURE UID:",
                textureUID
            );


            // ==================================================
            // CHECK ALBEDO CHANNEL
            // ==================================================

            if (
                !material.channels ||
                !material.channels.AlbedoPBR
            ) {

                console.error(
                    "ALBEDO PBR CHANNEL NOT FOUND"
                );

                return;

            }


            // ==================================================
            // ENABLE ALBEDO
            // ==================================================

            material.channels.AlbedoPBR.enable = true;


            // ==================================================
            // REMOVE ANY COLOUR TINT
            // ==================================================

            material.channels.AlbedoPBR.color = [

                1,
                1,
                1,
                1

            ];


            // ==================================================
            // APPLY NEW TEXTURE
            //
            // IMPORTANT:
            //
            // Keep original texture settings.
            // Change ONLY the texture UID.
            //
            // NO UV_SCALE
            // NO setUVScale
            // NO setUVOffset
            // NO setUVRotation
            //
            // ==================================================

            material.channels.AlbedoPBR.texture = {

                ...originalTexture,

                uid: textureUID

            };


            console.log(
                "ORIGINAL MATERIAL TEXTURE SETTINGS PRESERVED"
            );


            // ==================================================
            // APPLY UPDATED MATERIAL
            // ==================================================

            window.sketchfabAPI.setMaterial(

                material,

                function(err) {

                    if (err) {

                        console.error(
                            "COULD NOT APPLY TEXTURE:",
                            err
                        );

                        return;

                    }


                    console.log("=================================");

                    console.log(
                        finish +
                        " TEXTURE APPLIED SUCCESSFULLY"
                    );

                    console.log(
                        "USING EXISTING GLB UV MAPPING"
                    );

                    console.log("=================================");

                }

            );

        }

    );

}


// ======================================================
// APPLY METAL COLOR
// ======================================================

function applyMetalColor(
    material,
    finish
) {

    const color = metalColors[finish];


    // ==================================================
    // CHECK COLOR
    // ==================================================

    if (!color) {

        console.error(
            "METAL COLOR NOT FOUND:",
            finish
        );

        return;

    }


    console.log("=================================");
    console.log("APPLYING METAL COLOR");
    console.log("FINISH:", finish);
    console.log("COLOR:", color);
    console.log("=================================");


    // ==================================================
    // CHECK ALBEDO
    // ==================================================

    if (
        !material.channels ||
        !material.channels.AlbedoPBR
    ) {

        console.error(
            "METAL ALBEDO CHANNEL NOT FOUND"
        );

        return;

    }


    // ==================================================
    // ENABLE ALBEDO
    // ==================================================

    material.channels.AlbedoPBR.enable = true;


    // ==================================================
    // REMOVE TEXTURE
    // ==================================================

    material.channels.AlbedoPBR.texture = null;


    // ==================================================
    // APPLY METAL COLOR
    // ==================================================

    material.channels.AlbedoPBR.color = color;


    // ==================================================
    // APPLY MATERIAL
    // ==================================================

    window.sketchfabAPI.setMaterial(

        material,

        function(err) {

            if (err) {

                console.error(
                    "COULD NOT APPLY METAL COLOR:",
                    err
                );

                return;

            }


            console.log("=================================");

            console.log(
                finish +
                " METAL COLOR APPLIED SUCCESSFULLY"
            );

            console.log("=================================");

        }

    );

}