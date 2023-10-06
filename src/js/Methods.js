function Meyerhoff(soilList){
    
    const solution = [{radius:'', length:'', Qadm: ''}]
    const Qp = Np * (4 / 3) * (math.pi * (r ^ 2));
    const Qf = Nf*(4/3)*((2*math.pi*r*Le)/200)
    const Fn = 2*math.pi*r*f*Lr
    const Qadm = Qp+Qf-Fn

    if (Le>=6*2*r && L<30*2*r) {
        
        solution[0]['radius']= r 
        solution[0]['length'] = L
        solution[0]['Qadm'] = Qadm
        return solution
    } else {
        
    }
}