"use client";

import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { OrbitControls } from '@react-three/drei'

import { get_positions, get_position } from "../util/motion";

const def_size = 0.1;
const sizes = [696340, 2440, 6052, 6371, 3389, 69910, 58230, 25362, 24622];
const km_to_unit = 149228138;
const days = [0, 88, 225, 365, 687, 4333, 10759, 30687, 60190];

function Ring(props) {

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(props.path)

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color={"teal"} />
        </line>
    )
}

function Planet(props) {

    const ref = useRef()
    const [hovered, hover] = useState(false)
    
    useFrame((state, delta) => (ref.current.rotation.x += delta))

    return (
      <mesh
        {...props}
        ref={ref}
        scale={Math.pow((props.size / km_to_unit / def_size), (1 / (Math.pow(props.planetSize, 2)))) * def_size}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={hovered ? 'crimson' : 'orange'} />
      </mesh>
    )
  }

export default function ModelThree(props) {

    const [ringPoints, setRingPoints] = useState([]);

    const [date, setDate] = useState(props.date);
    const [positions, setPositions] = useState([]);

    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current == null) {
            const newPoints = [];
            for (let i = 0; i < 9; i++) {
                const points = []
                for (let j = 0; j < days[i] + 1; j += 0.5) {
                    const jd = props.date + j;
                    const ring_vect = get_position(i, jd);
                    points.push(new THREE.Vector3(ring_vect[0], ring_vect[1], ring_vect[2]));
                }
                newPoints.push(points);
            }
            setRingPoints(newPoints);
            console.log("stuff");
            canvasRef.current = 0;
        }
    }, []);

    useEffect(() => {
        setPositions( get_positions(props.date) );
    }, [props.date]);

    return (
        <Canvas camera={{zoom: 5, fov: 1000, position: [0,4.0,0.6]}}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            {
                positions.map((pos, index) => {
                    return <Planet key={index} position={pos} size={sizes[index]} planetSize={props.planetSize}/>
                })
            }
            {
                positions.map((pos, index) => {
                    return <Ring key={index} path={ringPoints[index]}/>
                })
            }
            <OrbitControls dampingFactor={0.1} />
        </Canvas>
    );
}