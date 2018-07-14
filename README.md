# Reinforcement-Leaning-Snake-AI
This AI learns to plays snake, and uses a simple feedforward neural network to learn from its past actions. Note that this approach is different from using genetic algorithms (having generation by generation improvement), and using Deep Q learning, though very similar.

The inputs that the neural network takes is the direction it's going, the distance from the fruit, the distance to closest wall, the cosine value of the angle that the fruit makes to the snake (I used the atan2 function to do this), and the sin.

How it works: 

**Reward/Penalize System**

If the snake dies, put an arbitrary negative value as the error for backpropogation.
If the snake eats the fruit, but a positive value as error to encourage that process again.
If the snake's distance decreases from the previous timestep, reward only slightly, to encourage the snake going towards fruit
If the snake's distance decreases from past time steps, penalize slightly with small negative value.

**Initialization of Parameters**
I initialized the weights and biases to Math.random() - .5
This is because I want to have mean 0, and small variance between the values.

**Hyperparamters**
Note that these hyperparameters were arbitrarily chosen

Learning rate of .05
Only 1 hidden layer

