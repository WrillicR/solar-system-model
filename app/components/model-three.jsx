"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { OrbitControls } from '@react-three/drei'

import { get_positions } from "../util/motion";

function Planet(props) {

    const ref = useRef()
    const [hovered, hover] = useState(false)
    
    useFrame((state, delta) => (ref.current.rotation.x += delta))

    return (
      <mesh
        {...props}
        ref={ref}
        scale={0.15}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={hovered ? 'crimson' : 'orange'} />
      </mesh>
    )
  }

export default function ModelThree(props) {

    const [date, setDate] = useState(props.date);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        setPositions( get_positions(props.date) );
    }, [props.date]);

    return (
        <Canvas camera={{zoom: 5, fov: 1000, position: [0,16,2]}}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Planet position={[0,0,0]} />
            {
                positions.map((pos, index) => {
                    return <Planet key={index} position={pos} />
                })
            }
            <OrbitControls dampingFactor={0.1} />
        </Canvas>
    );
}