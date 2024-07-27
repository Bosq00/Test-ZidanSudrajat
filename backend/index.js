'use strict';
    const express =require('express');
    const config=require('./config')
    const cors =require('cors');
    const bodyParser=require('body-parser');
    const employeeRoutes=require('./routers/Routes');

    const app=express();
// Increase the limit for JSON payloads
app.use(express.json({ limit: '10mb' }));

// Increase the limit for URL-encoded form data
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    app.use(cors({credentials:true,origin:'http://localhost:3000'}));
    app.use(bodyParser.json());
    
    app.use('/api',employeeRoutes.routes);

    app.listen(config.port,()=>console.log('Server Running : http://localhost:'+config.port));

