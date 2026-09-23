const initializeSocket=(io)=>{
    io.on("connection",(socket)=>{
        console.log("user connected:",socket.id);

        // driver sends live location
        socket.on("updateLocation",(data)=>{
            console.log("Location received:",data);
        
            const{
                busId,
                latitude,longitude,
                speed,
                heading,
            }=data;

            // send locationto passenger watching this bus
            io.to(`bus_${busId}`).emit("busLocationUpdated",{
                busId,
                latitude,
                longitude,
                speed,
                heading,
                updatedAt:new Date(),
            });
        });
        // passenger stops watching a bus
        socket.on("leaveBus",(busId)=>{
            socket.leave(`bus_${busId}`);

            console.log(
                `socket ${socket.id} left bus_${busId}`
            );
        });

        // user disconnected
        socket.on("User disconnected:",socket.id());
    });
};

export default initializeSocket;