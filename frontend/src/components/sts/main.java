import java.util.*;
class main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=100;
        int arr[]= new int [100];
        int i=0;
        while(n!=-1){
            arr[i]=sc.nextInt();
            i++;
        }
        boolean loop=false;
        for(i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                if(arr[i]==arr[j]){
                    loop=true;
                    break;
                }
            }
            if(loop){
                break;
            }
        }
        if(loop){
            System.out.println("Loop detected");
        }
        else{
            System.out.println("Loop not detected");
        }
    }
}