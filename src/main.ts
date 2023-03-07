// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import RenderWidget from './lib/rendererWidget';
import { Application, createWindow, Window } from './lib/window';

import * as helper from './helper';
import { MeshPhongMaterial, Object3D } from 'three';
// put your imports here

/*******************************************************************************
 * Main entrypoint. Previouly declared functions get managed/called here.
 * Start here with programming.
 ******************************************************************************/

var camera: THREE.PerspectiveCamera;
var controls: OrbitControls;
var rendererDiv: Window;

function main(){
    var root = Application("Robot");
  	root.setLayout([["renderer"]]);
    root.setLayoutColumns(["100%"]);
    root.setLayoutRows(["100%"]);

    // ---------------------------------------------------------------------------
    // create RenderDiv
    rendererDiv = createWindow("renderer");
    root.appendChild(rendererDiv);

    // create renderer
    var renderer = new THREE.WebGLRenderer({
        antialias: true,  // to enable anti-alias and get smoother output
    });

    // important exercise specific limitation, do not remove this line
    THREE.Object3D.DefaultMatrixAutoUpdate = false;

    // create scene
    var scene = new THREE.Scene();
    // manually set matrixWorld
    scene.matrixWorld.copy(scene.matrix);

    helper.setupLight(scene);

    // create camera
    camera = new THREE.PerspectiveCamera();
    helper.setupCamera(camera, scene);

    // create controls
    controls = new OrbitControls(camera, rendererDiv);
    helper.setupControls(controls);

    // start the animation loop (async)
    var wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
    wid.animate();

    // my code
    
    // 
    // Robot
    //

    // Body
    
    var geoB = new THREE.BoxGeometry(0.2,0.4,0.1)
    var mat = new THREE.MeshPhongMaterial({color: 0x696969})
    var jointmat = new THREE.MeshPhongMaterial()
    jointmat.transparent = true
    jointmat.opacity = 0
    var meshB = new THREE.Mesh(geoB,mat)
    meshB.matrix.set(1,0,0,0,
                    0,1,0,0.1,
                    0,0,1,0,
                          0,0,0,1)
    

    // Head
    var geoH = new THREE.SphereGeometry(0.11,10,10)
    var meshH = new THREE.Mesh(geoH,mat)
    meshH.matrix.set(1,0,0,0,
                          0,1,0,0.33,
                          0,0,1,0,
                          0,0,0,1)
    meshB.add(meshH)
    update(meshH)
    // LA joint
    var geoLAJ = new THREE.BoxGeometry(0.05,0.05,0.05)
    var meshLAJ = new THREE.Mesh(geoLAJ,jointmat)
    meshLAJ.matrix.set(1,0,0,-0.1,
                        0,1,0,0.15,
                        0,0,1,0,
                        0,0,0,1)   
    meshLAJ.name = "joint" 
    meshB.add(meshLAJ)
    update(meshLAJ)
    // Left Arm
    var geoAL = new THREE.BoxGeometry(0.25,0.1,0.1)
    var meshAL = new THREE.Mesh(geoAL,mat)
    meshAL.matrix.set(1,0,0,-0.15,
                           0,1,0,0,
                           0,0,1,0,
                           0,0,0,1)
    meshLAJ.add(meshAL)
    update(meshAL)
    // RA joint
    var geoRAJ = new THREE.BoxGeometry(0.05,0.05,0.05)
    var meshRAJ = new THREE.Mesh(geoRAJ,jointmat)
    meshRAJ.matrix.set(1,0,0,0.1,
                        0,1,0,0.15,
                        0,0,1,0,
                        0,0,0,1)    
    meshRAJ.name = "joint"
    meshB.add(meshRAJ)
    update(meshRAJ)
    
    // Right Arm
    var geoAR = new THREE.BoxGeometry(0.25,0.1,0.1)
    var meshAR = new THREE.Mesh(geoAR,mat)
    meshAR.matrix.set(1,0,0,0.15,
                           0,1,0,0,
                           0,0,1,0,
                           0,0,0,1)
    meshRAJ.add(meshAR)
    update(meshAR)

    // LL joint
    var geoLLj = new THREE.BoxGeometry(0.05,0.05,0.05)
    var meshLLJ = new THREE.Mesh(geoLLj,jointmat)
    meshLLJ.matrix.set(1,0,0,0.-0.055,
                        0,1,0,-0.2,
                        0,0,1,0,
                        0,0,0,1)
    meshLLJ.name = "joint"
    meshB.add(meshLLJ)
    update(meshLLJ)

    // Left Leg
    var geoLL = new THREE.BoxGeometry(0.1,0.25,0.1)
    var meshLL = new THREE.Mesh(geoLL,mat)
    meshLL.matrix.set(1,0,0,0,
                           0,1,0,-0.15,
                           0,0,1,0,
                           0,0,0,1)
    meshLLJ.add(meshLL)
    update(meshLL)

    // RL joint
    var geoRLj = new THREE.BoxGeometry(0.05,0.05,0.05)
    var meshRLJ = new THREE.Mesh(geoRLj,jointmat)
    meshRLJ.matrix.set(1,0,0,0.055,
                        0,1,0,-0.2,
                        0,0,1,0,
                        0,0,0,1)
    meshRLJ.name = "joint"
    meshB.add(meshRLJ)
    update(meshRLJ)

    // Right Leg
    var geoRL = new THREE.BoxGeometry(0.1,0.25,0.1)
    var meshRL = new THREE.Mesh(geoRL,mat)
    meshRL.matrix.set(1,0,0,0.0,
                           0,1,0,-0.15,
                           0,0,1,0,
                           0,0,0,1)
    meshRLJ.add(meshRL)
    update(meshRL)

    //LF joint
    var geoLFJ = new THREE.BoxGeometry(0.05,0.05,0.05)
    var meshLFJ = new THREE.Mesh(geoLFJ,jointmat)
    meshLFJ.matrix.set(1,0,0,0,
                           0,1,0,-0.14,
                           0,0,1,0,
                           0,0,0,1);
    meshLFJ.name = "joint"
    meshLL.add(meshLFJ)
    update(meshLFJ)

    //Left Foot
    var geoLF = new THREE.BoxGeometry(0.1,0.04,0.15)
    var meshLF = new THREE.Mesh(geoLF,mat)
    meshLF.matrix.set(1,0,0,0,
                           0,1,0,-0.05,
                           0,0,1,0.03,
                           0,0,0,1)
    meshLFJ.add(meshLF)
    update(meshLF)

    //RF joint
    var geoRFJ = new THREE.BoxGeometry(0.05,0.05,0.05)
    var meshRFJ = new THREE.Mesh(geoRFJ,jointmat)
    meshRFJ.matrix.set(1,0,0,0,
                           0,1,0,-0.14,
                           0,0,1,0,
                           0,0,0,1)
    meshRFJ.name = "joint"
    meshRL.add(meshRFJ)
    update(meshRFJ)
    
    //Right Foot
    var geoRF = new THREE.BoxGeometry(0.1,0.04,0.15)
    var meshRF = new THREE.Mesh(geoRF,mat)
    meshRF.matrix.set(1,0,0,0,
                           0,1,0,-0.05,
                           0,0,1,0.03,
                           0,0,0,1)
    meshRFJ.add(meshRF)
    update(meshRL)
    scene.add(meshB)
    update(meshB)
    

    function update(obj: Object3D){
        if(obj.parent === null){
            obj.matrixWorld.copy(obj.matrix)
        }
        else{
            obj.matrixWorld.multiplyMatrices(obj.parent.matrixWorld, obj.matrix)
            for(let i = 0, l = obj.children.length; i<l;i++){
                update(obj.children[i])
            }
        }
        
    }
    
    var base = new THREE.Mesh
    base.name = "base"
    var currentNode = base;
    var boolAxis = false;
    document.onkeydown= (e) => {
        e = e || window.event;
        if(e.code === "KeyS"){
            if(currentNode.name == "base"){
                selectBody(meshB)
            }
            else{
                selectChild(currentNode)
            }  
        }
        if(e.code === "KeyW"){
            selectParent(currentNode)
        }
        if(e.code === "KeyD"){
            selectNextSibling(currentNode)
        }
        if(e.code === "KeyA"){
            selectPreviousSibling(currentNode)
        }
        if(e.code === "KeyC"){
            if(boolAxis){
                boolAxis = false
            }
            else{
                boolAxis = true
            }
            axis(currentNode)
        
        }
        if(e.code === "ArrowUp"){
            rotUp(currentNode)
        }
        if(e.code === "ArrowDown"){
            rotDown(currentNode)
        }
        if(e.code === "ArrowLeft"){
            rotLeft(currentNode)
        }
        if(e.code === "ArrowRight"){
            rotRight(currentNode)
        }
        if(e.code === "KeyR"){
            reset()
        }
    };

    function selectBody(mesh: THREE.Mesh){
        mesh.material = new MeshPhongMaterial({color: "red"});
        currentNode = meshB;
        if(boolAxis){
            axis(mesh)
        }
    }
    function selectChild(mesh: THREE.Mesh){
        if(mesh.children[0] != null && mesh.children[0] instanceof THREE.Mesh){
            if(mesh.children[0].name == "joint" && mesh.children[0].children[0] instanceof THREE.Mesh){
                mesh.material = new THREE.MeshPhongMaterial({color: 0x696969})
                mesh.children[0].children[0].material = new MeshPhongMaterial({color: "red"});
                if(boolAxis){
                    axis(mesh)
                    axis(mesh.children[0].children[0])
            }
                currentNode = mesh.children[0].children[0]
            }
            else{
                mesh.material = new THREE.MeshPhongMaterial({color: 0x696969})
                mesh.children[0].material = new MeshPhongMaterial({color: "red"});
                if(boolAxis){
                    axis(mesh)
                    axis(mesh.children[0])
                }
               currentNode = mesh.children[0]
        }
        }
    }

    function selectParent(mesh: THREE.Mesh){
        console.log(mesh.parent)
        if(mesh.parent instanceof THREE.Scene){
            mesh.material = new THREE.MeshPhongMaterial({color: 0x696969})
            currentNode = base
            if(boolAxis){
                axis(mesh)
                axis(currentNode)
            }
        }
        else if(mesh.parent instanceof THREE.Mesh){
            if(mesh.parent.name == "joint"){
               if(mesh.parent.parent instanceof THREE.Mesh){
                mesh.material = new THREE.MeshPhongMaterial({color: 0x696969})
                mesh.parent.parent.material = new THREE.MeshPhongMaterial({color: "red"});
                currentNode = mesh.parent.parent
                if(boolAxis){
                    axis(mesh)
                    axis(currentNode)
                }
               }
            }
            else{
                mesh.material = new THREE.MeshPhongMaterial({color: 0x696969})
                mesh.parent.material = new THREE.MeshPhongMaterial({color: "red"});
                currentNode = mesh.parent
                if(boolAxis){
                    axis(mesh)
                    axis(currentNode)
                }
            }
            
        }
    
    }

    function selectNextSibling(mesh: THREE.Mesh){
        if(mesh.parent instanceof THREE.Mesh){
            if(mesh.parent.name == "joint"){
                if(mesh.parent.parent instanceof THREE.Mesh){
                    let index = mesh.parent.parent.children.indexOf(mesh.parent)
                    if(mesh.parent.parent.children[index+1] instanceof THREE.Mesh){
                        if(mesh.parent.parent.children[index+1].name == "joint"){
                            mesh.material = new THREE.MeshPhongMaterial({color: 0x696969});
                            currentNode = <THREE.Mesh>mesh.parent.parent.children[index+1].children[0];
                            currentNode.material = new THREE.MeshPhongMaterial({color: "red"});
                            if(boolAxis){
                                axis(mesh)
                                axis(currentNode)
                        }
                        }
                        else{
                            mesh.material = new THREE.MeshPhongMaterial({color: 0x696969});
                            currentNode = <THREE.Mesh>mesh.parent.parent.children[index+1];
                            
                            currentNode.material = new THREE.MeshPhongMaterial({color: "red"});
                            if(boolAxis){
                                axis(mesh)
                                axis(currentNode)
                        }
                        }
                    }
                }
            }
            else{
                let index = mesh.parent.children.indexOf(mesh)
                if(mesh.parent.children[index+1] instanceof THREE.Mesh){
                    mesh.material = new THREE.MeshPhongMaterial({color: 0x696969});
                    currentNode = <THREE.Mesh>mesh.parent.children[index+1];
                    if(currentNode.name == "joint"){
                        currentNode = <THREE.Mesh>currentNode.children[0]
                    }
                    currentNode.material = new THREE.MeshPhongMaterial({color: "red"}); 
                    if(boolAxis){
                        axis(mesh)
                        axis(currentNode)
                    }
                } 
            }
        }
    }
    function selectPreviousSibling(mesh: THREE.Mesh){
        if(mesh.parent instanceof THREE.Mesh){
            if(mesh.parent.name == "joint"){
                if(mesh.parent.parent instanceof THREE.Mesh){
                    let index = mesh.parent.parent.children.indexOf(mesh.parent)
                    if(mesh.parent.parent.children[index-1] instanceof THREE.Mesh){
                        if(mesh.parent.parent.children[index-1].name == "joint"){
                            mesh.material = new THREE.MeshPhongMaterial({color: 0x696969});
                            currentNode = <THREE.Mesh>mesh.parent.parent.children[index-1].children[0];
                            currentNode.material = new THREE.MeshPhongMaterial({color: "red"});
                            if(boolAxis){
                                axis(mesh)
                                axis(currentNode)
                        }
                        }
                        else{
                            mesh.material = new THREE.MeshPhongMaterial({color: 0x696969});
                            currentNode = <THREE.Mesh>mesh.parent.parent.children[index-1];
                            currentNode.material = new THREE.MeshPhongMaterial({color: "red"});
                            if(boolAxis){
                                axis(mesh)
                                axis(currentNode)
                        }
                        }
                    }
                }
            }else{
                let index = mesh.parent.children.indexOf(mesh)
                if(mesh.parent.children[index-1] instanceof THREE.Mesh){
                    mesh.material = new THREE.MeshPhongMaterial({color: 0x696969});
                    currentNode = <THREE.Mesh>mesh.parent.children[index-1];
                    currentNode.material = new THREE.MeshPhongMaterial({color: "red"});
                    if(boolAxis){
                        axis(mesh)
                        axis(currentNode)
                }
            } 
        }
        }
    }
    

    function axis(mesh: THREE.Mesh){
        const hasAxis = (element: THREE.Object3D)=>element instanceof THREE.AxesHelper
        if(mesh.parent?.name== "joint"){
            mesh = <THREE.Mesh>mesh.parent
        }
        if(mesh.children.findIndex(hasAxis) == -1){
            var axis = new THREE.AxesHelper(0.5)
            axis.matrixWorld = mesh.matrixWorld
            mesh.add(axis)
        }
        else{
            mesh.remove(mesh.children[mesh.children.findIndex(hasAxis)])

        }
    }
     function rotUp(mesh: THREE.Mesh){
        if(mesh.parent?.name== "joint"){
            mesh = <THREE.Mesh>mesh.parent
        }
        var up = new THREE.Matrix4
        var angle = -0.15
        up.set(
            1,0,0,0,
            0,Math.cos(angle),-Math.sin(angle),0,
            0,Math.sin(angle),Math.cos(angle),0,
            0,0,0,1
        )
        mesh.matrix.multiply(up)
        update(mesh)
     }
     function rotDown(mesh: THREE.Mesh){
        if(mesh.parent?.name== "joint"){
            mesh = <THREE.Mesh>mesh.parent
        }
        var down = new THREE.Matrix4
        var angle = 0.15
        down.set(
            1,0,0,0,
            0,Math.cos(angle),-Math.sin(angle),0,
            0,Math.sin(angle),Math.cos(angle),0,
            0,0,0,1
        )
        mesh.matrix.multiply(down)
        update(mesh)
     }

     function rotLeft(mesh: THREE.Mesh){
        if(mesh.parent?.name== "joint"){
            mesh = <THREE.Mesh>mesh.parent
        }
        var left = new THREE.Matrix4
        var angle = -0.15
        left.set(
            Math.cos(angle),0,Math.sin(angle),0,
            0,1,0,0,
            -Math.sin(angle),0,Math.cos(angle),0,
            0,0,0,1
        )
        mesh.matrix.multiply(left)
        update(mesh)
     }

     function rotRight(mesh: THREE.Mesh){
        if(mesh.parent?.name== "joint"){
            mesh = <THREE.Mesh>mesh.parent
        }
        var right = new THREE.Matrix4
        var angle = 0.15
        right.set(
            Math.cos(angle),0,Math.sin(angle),0,
            0,1,0,0,
            -Math.sin(angle),0,Math.cos(angle),0,
            0,0,0,1
        )
        mesh.matrix.multiply(right)
        update(mesh)
     }
     function reset(){
        meshB.matrix.set(1,0,0,0,
            0,1,0,0.1,
            0,0,1,0,
            0,0,0,1)

            meshH.matrix.set(1,0,0,0,
                0,1,0,0.33,
                0,0,1,0,
                0,0,0,1)

                meshLAJ.matrix.set(1,0,0,-0.1,
                    0,1,0,0.15,
                    0,0,1,0,
                    0,0,0,1)

                    meshAL.matrix.set(1,0,0,-0.15,
                        0,1,0,0,
                        0,0,1,0,
                        0,0,0,1)

                        meshRAJ.matrix.set(1,0,0,0.1,
                            0,1,0,0.15,
                            0,0,1,0,
                            0,0,0,1)

                            meshAR.matrix.set(1,0,0,0.15,
                                0,1,0,0,
                                0,0,1,0,
                                0,0,0,1)

                                meshLLJ.matrix.set(1,0,0,0.-0.055,
                                    0,1,0,-0.2,
                                    0,0,1,0,
                                    0,0,0,1)

                                    meshLL.matrix.set(1,0,0,0,
                                        0,1,0,-0.15,
                                        0,0,1,0,
                                        0,0,0,1)

                                        meshRLJ.matrix.set(1,0,0,0.055,
                                            0,1,0,-0.2,
                                            0,0,1,0,
                                            0,0,0,1)

                                            meshRL.matrix.set(1,0,0,0.0,
                                                0,1,0,-0.15,
                                                0,0,1,0,
                                                0,0,0,1)

                                                meshLFJ.matrix.set(1,0,0,0,
                                                    0,1,0,-0.14,
                                                    0,0,1,0,
                                                    0,0,0,1);

                                                    meshLF.matrix.set(1,0,0,0,
                                                        0,1,0,-0.05,
                                                        0,0,1,0.03,
                                                        0,0,0,1)

                                                        meshRFJ.matrix.set(1,0,0,0,
                                                            0,1,0,-0.14,
                                                            0,0,1,0,
                                                            0,0,0,1)

                                                            meshRF.matrix.set(1,0,0,0,
                                                                0,1,0,-0.05,
                                                                0,0,1,0.03,
                                                                0,0,0,1)
       
        update(meshB)
            
    }

    
    
}

// call main entrypoint
main();
