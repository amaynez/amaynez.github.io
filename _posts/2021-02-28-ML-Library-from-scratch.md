---
layout: post
title:  Machine Learning Library in Python from scratch
date:   2021-02-28 12:32:20 -0600
description: Single neuron perceptron that classifies elements learning quite quickly.
img: MLLibrary.jpg 
tags: [Machine Learning, Coding, Neural Networks, Python]
author: Armando Maynez
---
<a href="https://github.com/amaynez/GenericNeuralNetwork"><img class="github-link" src='/assets/img/view_on_github.png' width = "180"></a>
<br>
<center><img src="/assets/img/ML_cloud.jpg"></center>

It must sound crazy that in this day and age, when we have such a myriad of amazing machine learning libraries and toolkits all open sourced, all quite well documented and easy to use, I decided to create my own ML library from scratch.

But let me try to explain; I am in the process of immersing myself into the world of Machine Learning, and to do so, I want to deeply understand the basic concepts and its foundations, so I think that there is no better way to do so than by creating myself all the code for a basic neural network library from scratch. This way I can gain in depth understanding of the math that underpins the ML algorithms.

Another benefit of doing this is that I am learning Python, so the experiment brings along good exercise in my new language.

To call it a Machine Learning Library is perhaps a bit of a stretch, since I just intended to create a **multi-neuron, multi-layered [perceptron](https://amaynez.github.io/single-neuron-perceptron/)**.

<center><img src="/assets/img/nnet_flow.gif"></center>

The library started very narrowly, with just the following functionality:
- **create** a neural network based on the following parameters:
    - number of inputs
    - size and number of hidden layers
    - number of outputs
    - learning rate
- **forward propagate** or predict the output values when given some inputs
- **learn** through back propagation using gradient descent

I restricted the model to be sequential, and the layers to be only dense or fully connected, this means that every neuron is connected to every neuron of the following layer. Also, as a restriction, the only activation function I implemented was sigmoid:

<center><img src="/assets/img/nn_diagram.jpg"></center>

With my neural network coded, I tested it with a very basic problem, the famous XOR problem.

XOR is a logical operation that cannot be solved by a single perceptron because its linearity restriction:

<center><img src="/assets/img/xor_problem.jpg"></center>

As you can see, when plotted in an X,Y plane, the logical operators AND and OR have a line that can clearly separate the points that are false from the ones that are true, hence a perceptron can easily manage to learn to classify them; however, for XOR there is no single rect line that can do so, therefore a multilayer perceptron is needed for the task.

So I created a neural network with my library:
```python
import Neural_Network as nn

inputs = 3
hidden_layers = [2, 1]
outputs = 1
learning_rate = 0.03

NN = nn.NeuralNetwork(inputs, hidden_layers, outputs, learning_rate)
```

The three inputs I decided to use (after a lot of trial and error) are the X and Y coordinate of a point (between X = 0, X = 1, Y = 0 and Y = 1) and as the third input the multiplication of both X and Y. Apparently it gives the network more information, and it ends up converging much more quickly with this third input.

Then I created the learning data, of course this is quite trivial for this problem, since I know very easily how to compute XOR.

```python
training_data = []
for n in range(learning_rounds):
    x__ = rnd.random()
    y__ = rnd.random()
    training_data.append([x__, y__, x__ * y__, 0 if (x__ < 0.5 and y__ < 0.5) or (x__ >= 0.5 and y__ >= 0.5) else 1])
training_data = np.array(training_data).reshape(learning_rounds, inputs + outputs)
```