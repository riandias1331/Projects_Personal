using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;

public class playerFps : MonoBehaviour

{
  
    public Animator Anim;
    public int lifeplayer = 100;
    public int danoEnemy = 40;
   
   
    public TextMeshProUGUI lifetext;
    public GameObject sanguetela;
    public string gameover;
    



    void Start() 
    {
        Anim = GetComponent<Animator>();
        sanguetela.SetActive(false);   
       

    }   


    void update ()
    {
       lifetext.text = lifeplayer.ToString();


       //morte do player
       if (lifeplayer <= 0){
        danoEnemy = 0;
        SceneManager.LoadScene("GameOver");
          StartCoroutine ("Morte");
        }

        
        
    
 
        
    } 

    void OnTriggerEnter(Collider collider) 
    {
        //colisao do player com o enemy (sua mao)
        if (collider.gameObject.tag == "maodoinimigo"){
        lifeplayer -= danoEnemy;
        //lifeplayer -= danoEnemy;
        sanguetela.SetActive(true);
        } 

        if (lifeplayer <= 0){
        danoEnemy = 0;
        SceneManager.LoadScene("GameOver");
          StartCoroutine ("Morte");
        }
          
       
        
    }
    IEnumerator Morte(){
       
        yield return new WaitForSeconds(1.0f);
        SceneManager.LoadScene(3);
    }

   
}
