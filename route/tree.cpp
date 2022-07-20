#include <iostream>
using namespace std;

struct Node 
{ 
    int data; 
    struct Node* left, *right; 
    Node(int data) 
    { 
        this->data = data; 
        left = right = NULL; 
    } 
}; 

void leftviewactual(struct Node*root)
{
    if(!root)
    {
        return;
    }
    cout<<root->data<<endl;
    leftviewactual(root->left);
    leftviewactual(root->right);
    
}
void leftview(struct Node*root)
{
    if(!root)
    {
        return;
    }
    cout<<root->data<<endl;
    if(!root->left)
    {
        cout<<root->data<<endl;
    }
    
    leftviewactual(root->left);
}
int main() 
{ 
    struct Node *root = new Node(32); 
    root->left             = new Node(16); 
    root->right         = new Node(3); 
    root->left->left     = new Node(14); 
    root->left->right = new Node(24);
     root->left->right->left = new Node(20); 
      root->left->right->right = new Node(25); 
  
    leftview(root);
  
    return 0; 
} 
