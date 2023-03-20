let currentAngle = 0;
let currentAngleY = 0;

let identitiyArray = new Float32Array(16);
let identityMatrix = glMatrix.mat4.identity(identitiyArray);

let topCubeWMatx = new Float32Array(16);
let botCubeWMatx = new Float32Array(16);
let leftCubeWMatx = new Float32Array(16);
let rightCubeWMatx = new Float32Array(16);

const norm = 1;
const defaultX = 0.5;
const defaultY = -1;
const defaultZ = -1;


glMatrix.mat4.translate(topCubeWMatx, identityMatrix, [defaultX, norm + defaultY, defaultZ]);

glMatrix.mat4.translate(botCubeWMatx, identityMatrix, [defaultX, defaultY, defaultZ]);

glMatrix.mat4.translate(leftCubeWMatx, identityMatrix, [norm + defaultX, defaultY, defaultZ]);

glMatrix.mat4.translate(rightCubeWMatx, identityMatrix, [-norm + defaultX, defaultY, defaultZ]);

let canvas = document.getElementById("pedestal");
canvas.width = 1000;
canvas.height = 1000;

initWebGl(canvas);

let shaderProgram = initShaderProgram(gl, vsSource, fsSource);
gl.useProgram(shaderProgram);


initBuffersCube()

let positionAttribLocationCube = enableVertexAttrib(
    shaderProgram,
    "vertPositions",
    3, 6, 0);
gl.enableVertexAttribArray(positionAttribLocationCube);

let colorAttribLocationCube = enableVertexAttrib(
    shaderProgram,
    "vertColor",
    3, 6, 3);
gl.enableVertexAttribArray(colorAttribLocationCube);

let matWorldLocationCube = gl.getUniformLocation(shaderProgram, "mWorld");
let matViewLocationCube = gl.getUniformLocation(shaderProgram, "mView");
let matProjLocationCube = gl.getUniformLocation(shaderProgram, "mProj");
let vecColors = gl.getUniformLocation(shaderProgram, "uColors");

let worldMatrixCube = new Float32Array(16);
let viewMatrixCube = new Float32Array(16);
let projMatrixCube = new Float32Array(16);
let uColorsCube = [0.0, 0.0, 0.0]

glMatrix.mat4.identity(worldMatrixCube)
glMatrix.mat4.lookAt(viewMatrixCube, [0, 0, -20], [0, 0, 0], [0, 1, 0]);
glMatrix.mat4.perspective(projMatrixCube, angle(45), canvas.width / canvas.height, 0.1, 1000.0);

gl.uniformMatrix4fv(matWorldLocationCube, false, worldMatrixCube);
gl.uniformMatrix4fv(matViewLocationCube, false, viewMatrixCube);
gl.uniformMatrix4fv(matProjLocationCube, false, projMatrixCube);
gl.uniform3fv(vecColors, uColorsCube)


gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

document.addEventListener('keydown', (event) => {
    let key = event.key;
    let angleRot = 3
    let step = 0.1
    switch (key) {
        case "z":
            currentAngle -= angleRot;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, angle(-angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, angle(-angleRot), [0, 1, 0]);

            glMatrix.mat4.translate(leftCubeWMatx, identityMatrix, [norm * Math.cos(angle(-currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(angle(-currentAngle + currentAngleY)) + defaultZ ]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, angle(currentAngle), [0, 1, 0]);

            glMatrix.mat4.translate(rightCubeWMatx, identityMatrix, [norm * Math.cos(angle(180 - currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(angle(180 - currentAngle + currentAngleY)) + defaultZ ]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, angle(currentAngle), [0, 1, 0]);
            break;
        case "c":
            currentAngle += angleRot;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, angle(angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, angle(angleRot), [0, 1, 0]);

            //giglMatrix.quat.setAxisAngle(  globalU)
            glMatrix.mat4.translate(leftCubeWMatx, identityMatrix, [norm * Math.cos(angle(-currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(angle(-currentAngle + currentAngleY)) + defaultZ]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, angle(currentAngle), [0, 1, 0]);

            glMatrix.mat4.translate(rightCubeWMatx, identityMatrix, [norm * Math.cos(angle(180 - currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(angle(180 - currentAngle + currentAngleY)) + defaultZ]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, angle(currentAngle), [0, 1, 0]);
            break
        case "a":

            currentAngle -= angleRot;
            currentAngleY -= angleRot;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, angle(-angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, angle(-angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, angle(-angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, angle(-angleRot), [0, 1, 0]);
            break
        case "d":
            currentAngle += angleRot;
            currentAngleY += angleRot;
            glMatrix.mat4.rotate(topCubeWMatx, topCubeWMatx, angle(angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(botCubeWMatx, botCubeWMatx, angle(angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(leftCubeWMatx, leftCubeWMatx, angle(angleRot), [0, 1, 0]);
            glMatrix.mat4.rotate(rightCubeWMatx, rightCubeWMatx, angle(angleRot), [0, 1, 0]);
            break
        case "q":
            glMatrix.mat4.rotate(viewMatrixCube, viewMatrixCube, angle(-angleRot), [0, 1, 0]);
            break
        case "e":

            glMatrix.mat4.rotate(viewMatrixCube, viewMatrixCube, angle(angleRot), [0, 1, 0]);
            break
        case "w":
            glMatrix.mat4.translate(leftCubeWMatx, leftCubeWMatx, [0, 0, step]);
            glMatrix.mat4.translate(botCubeWMatx, botCubeWMatx, [0, 0, step]);
            glMatrix.mat4.translate(rightCubeWMatx, rightCubeWMatx, [0, 0,step]);
            glMatrix.mat4.translate(topCubeWMatx, topCubeWMatx, [0, 0,step]);
            break
        case "s":
            step = -0.1
            glMatrix.mat4.translate(leftCubeWMatx, leftCubeWMatx, [0, 0, step]);
            glMatrix.mat4.translate(botCubeWMatx, botCubeWMatx, [0, 0, step]);
            glMatrix.mat4.translate(rightCubeWMatx, rightCubeWMatx, [0, 0,step]);
            glMatrix.mat4.translate(topCubeWMatx, topCubeWMatx, [0, 0,step]);
            break
    }
}, false);


function loop() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(matViewLocationCube, false, viewMatrixCube);

    gl.uniform3fv(vecColors, [1, 0.84, 0])
    glMatrix.mat4.copy(worldMatrixCube, topCubeWMatx);
    gl.uniformMatrix4fv(matWorldLocationCube, false, worldMatrixCube);
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    glMatrix.mat4.copy(worldMatrixCube, botCubeWMatx);
    gl.uniformMatrix4fv(matWorldLocationCube, false, worldMatrixCube);
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    gl.uniform3fv(vecColors, [0.66, 0.66, 0.66])
    glMatrix.mat4.copy(worldMatrixCube, leftCubeWMatx);
    gl.uniformMatrix4fv(matWorldLocationCube, false, worldMatrixCube);
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    gl.uniform3fv(vecColors, [0.66, 0.57, 0.33])
    glMatrix.mat4.copy(worldMatrixCube, rightCubeWMatx);
    gl.uniformMatrix4fv(matWorldLocationCube, false, worldMatrixCube);
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
