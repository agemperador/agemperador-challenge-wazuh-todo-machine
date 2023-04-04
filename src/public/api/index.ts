
export const postHttp = async (http,url, body)=>{

    const response  = await http.post(
        url, 
        {
            body: JSON.stringify(body),
            },
        )      
    return response
}


export const deleteHttp = async (http,url, body)=>{
    console.log(body);

    const response  = await http.post(
        url, 
        {
            body:JSON.stringify(body),
        },
    )      
    return response

}

export const patchHttp = async (http,url, body)=>{
    console.log(body);
    const response  = await http.patch(
        url, 
        {
            body:JSON.stringify(body),
        },
    )
    return response
    
}
